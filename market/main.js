let isThere=0;
		let total =0;
		function close_btn(event){
			let elem =event.target.parentElement;
			let id=elem.id;
			let currentCart = $("#"+id +" .qty").text();
				currentCart = currentCart.match(/\d+/ig);
				currentCart = currentCart[0];
				let price = $("#"+id +" .pr").text();
					price = price.match(/\d+/ig);
					price = price[0];
					total -= Number(price);
			if(currentCart==1){
				$('#'+id).remove();
				changeslive(id,"backward");
			}
			else{
				changeslive(id,"backward");
			}
		}
		$('.cart_r ').hide();
		function dragst(event){
			//if(event.target)
			let imgC = document.getElementsByClassName('card-img-top')
			let array_img = Array.from(imgC);
			if(array_img.indexOf(event.target)>-1){
				event.dataTransfer.setData("text",event.target.parentElement.id);
				let qty = $("#"+event.target.parentElement.id +" .qty").text();
				qty = qty.match(/\d+/ig);
				qty = qty[0];
				if(qty>1){
					isThere=1;
					
				}
			}
			else{
				let qty = $("#"+event.target.id +" .qty").text();
				qty = qty.match(/\d+/ig);
				qty = qty[0];
				if(qty>1){
					isThere=1;
					
				}
				event.dataTransfer.setData("text",event.target.id);
			}
		}
		function app(event){
			event.preventDefault();
			let content = event.dataTransfer.getData("text");
			let main_component = event.target;
			if(event.target.classList[1]!="const_def"){
				main_component = $(event.target).parentsUntil('.const_def').parent()[0];
				console.log(main_component)
			}
			console.log(main_component)
			if(main_component.classList[1]=="const_def"){
				
				let elem = document.getElementById(content)
				let tmp1Id = $(elem).attr('id');
				let priId = tmp1Id.replace("market","cart");
				console.log($("."+main_component.classList[1]+" #"+priId))
				if($("."+main_component.classList[1]+" #"+priId).length==0){
					main_component.appendChild(elem);
					
					$("#"+elem.id).attr('id', priId);
					let price = $("#"+priId +" .pr").text();
					price = price.match(/\d+/ig);
					price = price[0];
					total += Number(price);
					$("#"+priId+" .card_bd_img").addClass("bg-success");
					$("#"+priId+" .cart_r").show();
					let qty2 = $("#"+priId +" .qty").text();
					
					$("#"+priId +" .qty").text("QTY:1 Kg");
					$("#"+priId).attr('draggable',"false");
					$("#"+priId).removeAttr('ondragstart');
					if(isThere==1){
						$(elem).clone().appendTo('.market_all');
						let tmpId = $(elem).attr('id');
						let secId = tmpId.replace("cart","market");
						$("#"+elem.id).attr('id', secId);
						$("#"+secId+" .card_bd_img").removeClass("bg-success");
						$("#"+secId).attr('draggable',"true");
						$("#"+secId).attr('ondragstart',"dragst(event)");
						$("#"+secId+" .cart_r").hide();
						console.log(qty2);
						qty2 = qty2.match(/\d+/ig);
						qty2 = qty2[0];
						qty2--;
						$("#"+secId +" .qty").text("Left:"+qty2+" Kg");
					}
				}
				else{
					changeslive(content,"forward");
				}
			}
			else{
				changeslive(content,"forward");
			}
			$('#total h3').text("Total: "+total+"$");
		}
		function changeslive(content,status){
				let priId = content.replace("market","cart");
				if(status=="forward"){
					let price = $("#"+priId +" .pr").text();
					price = price.match(/\d+/ig);
					price = price[0];
					total += Number(price);
				}
				else{
					priId = content.replace("cart","market");
					let tmp = priId;
					priId = content;
					content = tmp;
					
				}
				
				let currentMarket = $("#"+content +" .qty").text();
				currentMarket = currentMarket.match(/\d+/ig);
				currentMarket = currentMarket[0];
				if(status=="forward"){
					currentMarket--;
				}
				else{
					currentMarket++;
				}
				$("#"+content +" .qty").text("Left:"+currentMarket+" Kg");
				let current = $("#"+priId +" .qty").text();
				if(current!==""){
					current = current.match(/\d+/ig);
					current = current[0];
					if(status=="forward"){
						current++;
					}
					else{
						current--;
					}
					$("#"+priId +" .qty").text("QTY:"+current+" Kg");
				}
				$('#total h3').text("Total: "+total+"$");
		}
		function allow(event){
			event.preventDefault();
		}