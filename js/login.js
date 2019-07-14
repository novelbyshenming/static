

function login() {

	var name = $('#name').val()
	var pwd = $('#pwd').val()
	var flag = false
	var checkbox = $('#checkbox').prop("checked")

	if (checkbox)
		flag = true

	var data = {
		username : name,
		password : pwd,
		flag : flag
	};
	
	if (name == "") {
		alert("请先输入用户名")
	} else if (pwd == "") {
		alert("请先输入密码")
	} else {

		$.post("login.l", data, function(data) {

			if (typeof (data) == typeof ("123")) {
				alert(data.substring(1, data.length - 1));
			} else if (data.code == -1) {
				alert(data.msg);
			} else {
				window.location.href = "http://localhost:90/index.html?uid="
						+ data.code;
			}

		});
	}
}