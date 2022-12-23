import navigatorLeft from '../assets/images/left-arrow.png'
import navigatorRight from '../assets/images/right-arrow.png'

// quantity constants...
const PLUS = "plus";
const MINUS = "minus";

// Color constants...
const SWATCH = "swatch";
const WHITE = "#FFFFFF";
const BLUE = "#D3D2D5";
const DARK_BLUE = "#1D1F22";
const GREEN_BORDER = "1px solid #5ECE7B";
const GREEN = "#5ECE7B";

// Directions...
const LEFT = "left";
const RIGHT = "right";

// Display values...
const NONE = "none";
const BLOCK = "block";
const FLEX = 'flex'

// Items singular plural...
const ITEM = "item";
const ITEMS = "items";

// Booleans...
const TRUE = true
const FALSE = false

// Image direction object...
const IMG_DIRECTION = {
    left: {
        src: navigatorLeft,
        alt: "gallery-navigator-left",
    },
    right: {
        src: navigatorRight,
        alt: "gallery-navigator-right",
    },
};

export {
    PLUS,
    MINUS,
    SWATCH,
    WHITE,
    BLUE,
    LEFT,
    RIGHT,
    GREEN_BORDER,
    NONE,
    DARK_BLUE,
    GREEN,
    ITEM,
    ITEMS,
    BLOCK,
    FLEX,
    TRUE,
    FALSE,
    IMG_DIRECTION
};