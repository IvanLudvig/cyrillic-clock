const BrowserText = (function () {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    function getWidth(text, fontSize) {
        context.font = fontSize + 'px ' + 'kirinu04';
        return context.measureText(text).width;
    }

    return { getWidth };
})();

let viewBox = { x: 0, y: 0, w: 1000, h: 1000 };

const svg = d3.select('#container')
    .append('svg')
    .attr('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`)
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)

const g = svg.append('g')
    .attr('color', '#e6e8ea')
    .attr('font-weight', 'bold')
    .attr('stroke-width', 2);

const r = 450;
const cx = viewBox.w / 2;
const cy = viewBox.h / 2;
g.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);

g.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 4 + r / 2)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);

g.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r / 2)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);

const mins = Object.keys(Array.from({ length: 60 }));
const dotsOffset = 16;
// const dots = g.append('g')
//     .selectAll('hour')
//     .data(mins)
//     .enter()
//     .append('circle')
//     .attr('cx', d => cx + (r - dotsOffset) * Math.sin(2 * Math.PI * d / 60))
//     .attr('cy', d => cy - (r - dotsOffset) * Math.cos(2 * Math.PI * d / 60))
//     .attr('r', d => 2 + 4 * (d % 5 == 0))
//     .attr('fill', '#fff');

const dots = g.append('g')
    .selectAll('hour')
    .data(mins)
    .enter()
    .append('circle')
    .attr('cx', d => cx + (r - dotsOffset - 0 * (d % 5 != 0)) * Math.sin(2 * Math.PI * d / 60))
    .attr('cy', d => cy - (r - dotsOffset - 0 * (d % 5 != 0)) * Math.cos(2 * Math.PI * d / 60))
    .attr('r', d => d % 5 ? 2 : 5)
    .attr('fill', d => (d % 5) ? '#fff' : '#000')
    .attr('stroke', d => (d % 5) ? '#000' : '#fff')
    .attr('stroke-width', '2');

const nums = Object.keys(Array.from({ length: 12 })).map(x => parseInt(x) + 1);
const letters = ['А', 'В', 'Г', 'Д', 'Е', 'Ѕ', 'З', 'И', 'Д', '\u0456', 'А\u0456', 'В\u0456']
const fontSize = 72;
const offset = 81;
const hours = g.append('g')
    .selectAll('hour')
    .data(nums)
    .enter()
    .append('text')
    .text(d => letters[d - 1][0] + '\u0483' + (letters[d - 1].length > 1 ? letters[d - 1][1] : ''))
    .attr('x', d => cx + (r - offset) * Math.sin(2 * Math.PI * d / 12) - BrowserText.getWidth(d, fontSize) / 2)
    .attr('y', d => cy - (r - offset) * Math.cos(2 * Math.PI * d / 12) + fontSize/2.8)
    .attr('font-size', fontSize)
    .style('fill', '#fff');

var date = new Date();

const armOffset = 12;
const hourOffset = 125;
const back = 40;

const minute = date.getMinutes();
const hour = date.getHours() % 12 + minute / 60;
g.append('line')
    .attr('x1', cx - back * Math.sin(2 * Math.PI * hour / 12))
    .attr('y1', cy + back * Math.cos(2 * Math.PI * hour / 12))
    .attr('x2', cx + (r - hourOffset) * Math.sin(2 * Math.PI * hour / 12))
    .attr('y2', cy - (r - hourOffset) * Math.cos(2 * Math.PI * hour / 12))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

g.append('line')
    .attr('x1', cx - back * Math.sin(2 * Math.PI * minute / 60))
    .attr('y1', cy + back * Math.cos(2 * Math.PI * minute / 60))
    .attr('x2', cx + (r - armOffset) * Math.sin(2 * Math.PI * minute / 60))
    .attr('y2', cy - (r - armOffset) * Math.cos(2 * Math.PI * minute / 60))
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

// g.append('circle')
//     .attr('cx', cx + (r - 3 * armOffset) * Math.sin(2 * Math.PI * hour / 12) / 3)
//     .attr('cy', cy - (r - 3 * armOffset) * Math.cos(2 * Math.PI * hour / 12) / 3)
//     .attr('r', 16)
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 2);

// g.append('circle')
//     .attr('cx', cx + (r - armOffset) * Math.sin(2 * Math.PI * minute / 60) / 3)
//     .attr('cy', cy - (r - armOffset) * Math.cos(2 * Math.PI * minute / 60) / 3)
//     .attr('r', 22)
//     .attr('stroke', '#fff')
//     .attr('stroke-width', 2);

g.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 20)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

g.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 16)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);


