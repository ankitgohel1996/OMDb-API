
$(document).ready(function()
{
   loadData();

   var $divs = $(".cardContainer");

	$('#year').click(function () 
	{
    	var yearlyOrderedDivs = $divs.sort(function (a, b) 
    	{
       		return $(a).find(".movieRelease").text() > $(b).find(".movieRelease").text()?1:-1;
    	});

    	$(".container").html(yearlyOrderedDivs);
	});

	$('#title').click(function () 
	{
    	var titleOrderedDivs = $divs.sort(function (a, b) 
    	{
       		return $(a).find(".movieTitle").text() > $(b).find(".movieTitle").text() ?1:-1;
    	});
    	
    	$(".container").html(titleOrderedDivs);
	});

	$( ".container" ).on('click','.cardContainer',function() 
	{
    	$(this).animate(
    	{
        	height: ($(this).height() == 400) ? 500 : 400,
       	 	width: ($(this).width() == 295) ? 350 : 295
   		}, "slow");
	});

});

function format(p1)
{
    p1.replace(" ","+");
    return p1;
}

var TestCase = ["Batman Begins","The Dark Knight","Inception","Avatar","Frozen","Deadpool","The Jungle Book","Warcraft",
				"Iron Man","Skyfall","Spectre","Casino Royale","The Prestige","Heat","Interstellar","Spy"];

function loadData()
{
	var count=1;
	var temp=1;

	var html='';

    for(i = 0; i < TestCase.length; i++) 
    {
        html += '<div class="cardContainer"> <div class="cardImage"> <img class="cardImagePicture" id="'+temp+'"></div> <div class="cardText"><span class="movieTitle" id="'+(++temp)+'"></span> <br> <span class="movieRelease" id="'+(++temp)+'"></span></div></div>';
        temp++;
    }

    $('.container').append(html);

	for(i=0;i<TestCase.length;i++)
	{

		$.getJSON("http://www.omdbapi.com/?t="+format(TestCase[i])+"&y=&plot=short&r=json", function(result)
   		{
   			var a=(count).toString();
   			count++;
   			var b=(count).toString();
   			count++;
   			var c=(count).toString();
   			count++;


   			$('#'+a).attr('src',result.Poster);
   			$('#'+b).text(result.Title.toUpperCase());
       		$('#'+c).text(result.Year);
       	});
	}
}

