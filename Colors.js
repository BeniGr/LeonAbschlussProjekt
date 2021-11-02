const colors = {
    warmBalls:[
        "rgba(219,56,0,1)",
        "rgba(190,0,219,1)",
        "rgba(219,0,136,1)"
    ],
    coldBalls:[
        "rgba(12,108,242,1)",
        "rgba(0,214,244,1)",
        "rgba(28,88,252,1)"
    ],
    lightBg:[
        "#505050",
        "#3c3f41",
    ],
    darkBg:[
        "#2b2b2b",
        "#323232",
        "#353535"
    ]
};
const newColors = [
    "rgba(242, 68, 5)",
    "rgba(255, 198, 5)",
    "rgba(3, 153, 153)",
    "rgba(17, 0, 102)",
    "rgba(166, 3, 63)",
]
const newColors2 = [
    "rgba( 3, 103, 166)",
    "rgba( 79, 115, 2)",
    "rgba( 242, 183, 5)",
    "rgba(242, 116, 5)",
    "rgba(166, 41, 13)",
]

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}