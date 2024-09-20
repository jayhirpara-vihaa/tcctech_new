"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DiamondClarityComponent = function (props) {
    var _a = react_1.useState(props.selectedValue && props.selectedValue.id), selectedClarity = _a[0], setSelectedClarity = _a[1];
    var handleClarity = function (e, item) {
        setSelectedClarity(item.id);
        props.value(item);
    };
    var defaultComponent = props.data.filter(function (t) { return parseInt(t.id) === parseInt(selectedClarity); });
    react_1.useEffect(function () {
        if (defaultComponent[0] != undefined) {
            props.value(defaultComponent[0]);
        }
    }, [selectedClarity]);
    return (react_1["default"].createElement("div", { className: "mt-3" },
        react_1["default"].createElement("span", { className: "TCC-config-title" }, "Diamond Quality: "),
        react_1["default"].createElement("span", null, defaultComponent.value),
        react_1["default"].createElement("div", { className: "space-x-2 flex" }, props.data.map(function (item) {
            return (react_1["default"].createElement("button", {
                key: item.id, id: item.id, className: (parseInt(selectedClarity) === parseInt(item.id)
                    ? "config-selected-value"
                    : "") + "  px-3 py-3 w-full", onClick: function (e) {
                        handleClarity(e, item);
                    }
            },
                react_1["default"].createElement("div", { id: item.id },
                    item.color_name,
                    " / ",
                    item.clarity_name)));
        }))));
};
exports["default"] = DiamondClarityComponent;
