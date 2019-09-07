let setBoxBody = function(){
	let width = $(window).width();
	let height = $(window).height();
	$("body").css({'width' : width, 'height' : height});
}

$(document).ready(function(){
	setBoxBody();
	$(window).resize(function(){
		setBoxBody();
	});

	$("textarea").autoMoreTextarea();

	$(".box button.submit-confess").click(function(event){
		$(".error-submit").remove();
		let recaptcha = $("#g-recaptcha-response").val();
		let confess = $(".confess").val();
		if (recaptcha === "") {
		  	event.preventDefault();
		  	$(".submit").before('<p class="error-submit">* Captcha là bắt buộc</p>');
		}
		else if(confess.trim() == ''){
			event.preventDefault();
		  	$(".box textarea").animate({'border-color':'red'});
		 	$("textarea").before('<p class="error-submit">* Nội dung confession là bắt buộc</p>');
		}
		else{
			$("body").append('<div class="loading"><div class="box-loading"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>');
			let d = new Date();
			let h = d.getHours() < 10 ? '0' : '' + d.getHours();
			let m = d.getMinutes() < 10 ? '0' : '' + d.getMinutes();
			let s = d.getSeconds() < 10 ? '0' : '' + d.getSeconds();
			let time = h + ':' + m + ":" + s;
			$.ajax({
                url : "./checkDb.php",
                type : "post",
                data : {
                     captcha : recaptcha,
                     confess : confess,
                     time : time
                },
                success : function (result){
                	// console.log(result);
                    let outResult = JSON.parse(result);
                    if(outResult.code == '1'){
                    	$(".loading").remove();
                    	$(".box").empty().append('<div class="done"><h2>Confession của bạn đã được ghi nhận!</h2><p>Cám ơn bạn đã gửi confession! Confesstion của bạn sẽ sớm được đăng!</p><button  class="submit" onclick="location.reload();">Gửi confesstion khác</button></div>');
                    }
                    else{
                    	$(".loading").empty().append('<div class="box"><h2>Xin lỗi!</h2><span>'+outResult.mess+'</span><button class="box" onclick="location.reload();" style="width: 250px;">Tải lại trang</button></div>');
                    }
                }
            });
		}
		return false;
	});

	$(window).scroll(function(){
		let sc = $(".banner").offset().top;
		if(sc > 32) {
			$(".banner").css({'height': '94px'});
		}
		else{
			$(".banner").removeAttr('style');
		}
	});
});