export default class ColumnChart {
  #data;
  #label;
  #formatHeading;
  #link;
  #value;

  constructor({ data = [], formatHeading, label = '', link = '', value = 0 } = {}) {
    this.#data = data;
    this.#label = label;
    this.#formatHeading = formatHeading;
    this.#link = link;
    this.#value = value;
    this.chartHeight = 50;

    this.element = this.createElement(this.createTemplate(this.#label, this.#value, this.#formatHeading, this.#data));
  }

  createColumn = (value, percent) => `<div style="--value: ${value}" data-tooltip="${percent}"></div>`

  createColumns = data => {
    const columnProps = this.getColumnProps(data);
    return columnProps.reduce((columns, columnProp) =>
      columns + this.createColumn(columnProp.value, columnProp.percent), '')
  }

  createTemplate = (label, value, formatHeading, data) => {
    const header = formatHeading ? formatHeading(value) : value;
    const chartClasses = data.length > 0 ? 'column-chart' : 'column-chart_loading';
    return `
        <div class=${chartClasses} style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                ${label}
                <a href="/sales" class="column-chart__link">View all</a>
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${header}</div>
                <div data-element="body" class="column-chart__chart">
                  ${this.createColumns(data)}
                </div>
            </div>
        </div>
      `;
  }

  createElement = template => {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  destroy = () => {
    this.remove();
  }

  getColumnProps (data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  remove = () => {
    this.element.remove();
  }

  update = data => {
    const columnProps = this.getColumnProps(data);
    const [oldChart] = this.element.getElementsByClassName("column-chart__chart");
    const chartParent = oldChart.parentNode;

    const newChart = oldChart.cloneNode(false);
    for (let i = 0; i < data.length; i++) {
      let column = document.createElement('div');
      column.style.setProperty('--value', `${columnProps[i].value}`);
      column.setAttribute('data-tooltip', `${columnProps[i].percent}`);
      newChart.appendChild(column);
    }

    chartParent.replaceChild(newChart, oldChart);
  }
}
