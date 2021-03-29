const list = [
    {
        x: 0,
        y: 2,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 1,
        y: 1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 2,
        y: 0,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 3,
        y: -1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 4,
        y: -2,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 5,
        y: -1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 6,
        y: 0,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 7,
        y: 1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 8,
        y: 2,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 9,
        y: 1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 10,
        y: 0,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 11,
        y: -1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 12,
        y: -2,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 13,
        y: -1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 14,
        y: 0,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 15,
        y: 1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 16,
        y: 2,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 17,
        y: 1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 18,
        y: 0,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 19,
        y: -1,
        min: false,
        max: false,
        hasWave: false
    },
    {
        x: 20,
        y: -2,
        min: false,
        max: false,
        hasWave: false
    },
];

/**
 * 寻找最大值和最小值的方式
 * */

// 方法1
/*
let min = 100000;
let max = -100000;
list.forEach(item => {
    if (item.y < min) {
        min = item.y;
        item.min = true;
    }
    if (item.y > max) {
        max = item.y;
        item.max = true;
    }
});
console.log(list);
*/

// 方法2
/*
let min = 100000;
let max = -100000;
for (let i = 0; i < list.length; i++) {
    const boforeItem = i === 0 ? {} : list[i -1];
    const currentItem = list[i];
    if (currentItem.y < min) {
        min = currentItem.y;
        currentItem.min = true;
        boforeItem.min = false;
    }
    if (currentItem.y > max) {
        max = currentItem.y;
        currentItem.max = true;
        boforeItem.max = false;
    }
}
console.log(list);
*/

/*
* 链式结构查询法(暂时使用数组解决)
* 1. 转化为链表
* 2. 只关注顶点以及顶点前后的数据
* **/
// 第一个点的前一个空白点
const beforeEmptyItem = {
    x: -1,
    y: 0
};
// 倒数第二个点的后一个空白点
const lastEmptyItem = {
    x: list.length,
    y: 0
};
// 两个相邻的高点距离
let adjacentMaxLength = -1;
// 两个相邻的低点距离
let adjacentMinLength = -1;

// 设置高点和低点
function setMaxAndMin(list) {
    for (let i = 0; i < list.length; i++) {
        const boforeItem = i === 0 ? beforeEmptyItem : list[i -1];
        const currentItem = list[i];
        const nextItem = i === (list.length - 1) ? lastEmptyItem : list[i + 1];
        // 当前点小于上一个点, 自动寻找低点
        if (currentItem.y < boforeItem.y) {
            // 下一个点是否小于当前点, 小于当前点则认为当前点不是最低点, 否则认为是最低点
            if (nextItem.y > currentItem.y) {
                currentItem.min = true;
            }
        }
        // 当前点小于上一个点, 自动寻找高点
        if (currentItem.y > boforeItem.y) {
            // 当前点大于上一个和下一个点, 认为当前点位最高点
            if (currentItem.y > nextItem.y) {
                currentItem.max = true;
            }
        }
    }
    return list;
}
// 获取波浪区间
function getWave(list) {
    let beforeMaxItem = {
        x: -1,
        y: 0
    };
    let currentMaxItem = {
        x: 0,
        y: 0
    };
    let beforeMinItem = {
        x: -1,
        y: 0
    };
    let currentMinItem = {
        x: 0,
        y: 0
    };
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!item.max && !item.min) continue;
        if (item.max) {
            beforeMaxItem = currentMaxItem;
            currentMaxItem = item;
            adjacentMaxLength = currentMaxItem.x - beforeMaxItem.x;
            if (adjacentMaxLength === adjacentMinLength) {
                item.hasWave = true;
                console.log('峰值:', item);
            }
        }
        if (item.min) {
            beforeMinItem = currentMinItem;
            currentMinItem = item;
            adjacentMinLength = currentMinItem.x - beforeMinItem.x;
            if (adjacentMaxLength === adjacentMinLength) {
                item.hasWave = true;
                console.log('谷值:', item);
            }
        }
    }
    return list;
}

const mmList = setMaxAndMin(list);
const resList = getWave(mmList);