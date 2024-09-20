"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CenterDiamondShape = function (props) {
    var _a;
    var _b = react_1.useState(props.selectedValue && props.selectedValue.id), selectedDiamondShape = _b[0], setSelectedDiamondShape = _b[1];
    var _c = react_1.useState(props.data.component), dimaondShapeList = _c[0], setDiamondShapeList = _c[1];
    var handleSelectedDiamondShape = function (e, item) {
        setSelectedDiamondShape(e.target.id);
        props.value(item);
    };
    var defaultDiamondShape = dimaondShapeList.filter(function (t) { return parseInt(t.id) === parseInt(selectedDiamondShape); });
    react_1.useEffect(function () {
        props.value(defaultDiamondShape[0]);
    }, [defaultDiamondShape]);
    react_1.useEffect(function () {
        if (props.filter == "G") {
            setDiamondShapeList(props.data && props.data.component && props.data.component.filter(function (t) { return t.type == 3 || t.type == 2; }) || []);
        }
        if (props.filter == "D") {
            setDiamondShapeList(props.data && props.data.component && props.data.component.filter(function (t) { return t.type == 3 || t.type == 1; }) || []);
        }
    }, [props.filter]);
    return (react_1["default"].createElement("div", { className: "mt-3" },
        react_1["default"].createElement("span", { className: "TCC-config-title" },
            props.data.title,
            ": "),
        react_1["default"].createElement("span", null, (_a = defaultDiamondShape[0]) === null || _a === void 0 ? void 0 : _a.name),
        react_1["default"].createElement("div", { className: "space-x-2 flex" }, dimaondShapeList.map(function (item) {
            return (react_1["default"].createElement("button", {
                key: item.id, onClick: function (e) {
                    handleSelectedDiamondShape(e, item);
                }, id: item.id, className: (parseInt(selectedDiamondShape) === parseInt(item.id)
                    ? "config-selected-value"
                    : "") + " px-7 py-3 "
            },
                react_1["default"].createElement(image_1["default"], { src: item.image, height: 25, width: 25, alt: "", id: item.id }),
                react_1["default"].createElement("div", { id: item.id }, item.name)));
        }))));
};
exports["default"] = CenterDiamondShape;
