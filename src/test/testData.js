export const appsDataTest = [
    {
        aid: 1,
        name: "微商平台",
        tables: [
            {
            tid: 1,
            name: "商品信息",
            },
            {
            tid: 2,
            name: "订单信息",
            },
            {
            tid: 3,
            name: "客户信息",
            }
        ]
    },
    {
        aid: 2,
        name: "人事考核系统",
        tables: [
            {
            tid: 1,
            name: "雇员信息"
            }
        ]
    },
    {
        aid: 3,
        name: "公司信息发布平台",
        tables: []
    }
]

export const tableData1_1 = {
    fields: [
        { name: '商品名', type: 'string' },
        { name: '库存数量', type: 'number' }
    ],
    records: [
        { '商品名': '苹果', '库存数量': 100 },
        { '商品名': '香蕉', '库存数量': 200 },
        { '商品名': '橘子', '库存数量': 300 }
    ]
}

export const tableData1_2 = {
    fields: [
        { name: '订单号', type: 'string' },
        { name: '账号', type: 'string' },
        { name: '数量', type: 'number' },
        { name: '金额', type: 'number' }
    ],
    records: [
        { '订单号': '20230101', '账号': '张三', '数量': 1, '金额': 10 },
        { '订单号': '20230102', '账号': '李四', '数量': 2, '金额': 20 },
        { '订单号': '20230103', '账号': '王五', '数量': 3, '金额': 30 }
    ]
}