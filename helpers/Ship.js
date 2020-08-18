const ShipType = {
    SUB: "SUB",
    SPEEDBOAT: "SPEEDBOAT",
    BATTLESHIP: "BATTLESHIP",
    AIRCRAFT_CARRIER: "AIRCRAFT_CARRIER",
    OIL_RIG: "OIL_RIG",
};

const Orientation = {
    LEFT:"LEFT",
    DOWN: "DOWN",
    RIGHT: "RIGHT",
    UP: "UP",
};

const getCells = (shipType, topLeft, shipOrientation) => {
    const X = true;
    const _ = false;
    let layout;

    switch (shipType) {
        case ShipType.AIRCRAFT_CARRIER:
            switch (shipOrientation) {
                case Orientation.LEFT:
                    layout = [
                        [X, X, X, X],
                        [_, X, X, _],
                    ];
                    break;
                case Orientation.UP:
                    layout = [
                        [_, X],
                        [X, X],
                        [X, X],
                        [_, X],
                    ];
                    break;
                case Orientation.RIGHT:
                    layout = [
                        [_, X, X, _],
                        [X, X, X, X],
                    ];
                    break;
                case Orientation.DOWN:
                    layout = [
                        [X, _],
                        [X, X],
                        [X, X],
                        [X, _],
                    ];
                    break;
            }
            break;
        case ShipType.BATTLESHIP:
            switch (shipOrientation) {
                case Orientation.LEFT:
                case Orientation.RIGHT:
                    layout = [
                        [X, X, X, X],
                    ];
                    break;
                case Orientation.UP:
                case Orientation.DOWN:
                    layout = [
                        [X],
                        [X],
                        [X],
                        [X],
                    ];
                    break;
            }
            break;
        case ShipType.OIL_RIG:
            switch (shipOrientation) {
                case Orientation.LEFT:
                case Orientation.RIGHT:
                    layout = [
                        [X, _, _, X],
                        [X, X, X, X],
                        [X, _, _, X],
                    ];
                    break;
                case Orientation.UP:
                case Orientation.DOWN:
                    layout = [
                        [X, X, X],
                        [_, X, _],
                        [_, X, _],
                        [X, X, X],
                    ];
                    break;
            }
            break;
        case ShipType.SPEEDBOAT:
            switch (shipOrientation) {
                case Orientation.LEFT:
                    layout = [
                        [X, _],
                        [X, X],
                    ];
                    break;
                case Orientation.UP:
                    layout = [
                        [X, X],
                        [X, _],
                    ];
                    break;
                case Orientation.RIGHT:
                    layout = [
                        [X, X],
                        [_, X],
                    ];
                    break;
                case Orientation.DOWN:
                    layout = [
                        [_, X],
                        [X, X],
                    ];
                    break;

            }
            break;
        case ShipType.SUB:
            switch (shipOrientation) {
                case Orientation.LEFT:
                case Orientation.RIGHT:
                    layout = [
                        [X, X],
                    ];
                    break;
                case Orientation.UP:
                case Orientation.DOWN:
                    layout = [
                        [X],
                        [X],
                    ];
                    break;
            }
            break;
    }

    if (layout) {
        const cells = [];
        layout.forEach((row, y) => {
            row.forEach((containsShip, x) => {
                if (containsShip) {
                    cells.push({x: topLeft.x + x, y: topLeft.y + y});
                }
            });
        });
        return cells;
    }

    return [];
}

module.exports = {Orientation, ShipType, getCells};