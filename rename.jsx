// ウィンドウをつくる
var win = new Window("palette", "任意の文字にテキストを変更するスクリプト", [200, 150, 480, 250]);

// 文字をウィンドウ上に表示する
win.add("statictext", [10, 10, 270, 25], "変更したい文字");

// 入力欄をつくる
var textValue = win.add("edittext", [10, 30, 270, 55], "");

// ボタンをつくる
var okButton = win.add("button", [150, 70, 220, 90], "実行");
var cancelButton = win.add("button", [60, 70, 140, 90], "閉じる");

// 実行ボタンの動作
function editText() {
	const text = textValue.text;
	var textFrame = app.activeDocument.textFrames[0];
	textFrame.contents = text;
}

okButton.onClick = function () {
	var bt = new BridgeTalk();
	bt.target = "illustrator";
	bt.body = "editText();";
	bt.onResult = function (inBT) {
		result = eval(inBT.body);
	};
	bt.onError = function (inBT) {
		alert(inBT.body);
	};
	bt.send(10);
	win.close(true);
};

// キャンセルボタンの動作
cancelButton.onClick = function () {
	win.close(true);
};

win.show();
