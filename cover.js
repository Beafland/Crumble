/*global $*/
/*jshint browser:true, esnext:true*/
function language() {
    var ei = "English";
    $("#language").on("click", function() {
        if (ei === "Chinese") {
            $(".mage").html("<p>Mage<br/>V：Imprisonment<br/>X:Attack<br/>C：Shield<br/>B：Meteor<br/>Q:Summon Servant</p>");
            $(".mech").html("<p>Mechanician<br/>,：Rage<br/>/：Attack<br/>m:Flash<br/>.：Biological Grenade<br/>L：Terriodrone</p>");
            $(".mage").css("letter-spacing", "0px");
            $(".mage").css("left", "2%");
            $(".mech").css("letter-spacing", "0px");
            $(".mech").css("right", "1%");
            $("#language").html("中文");
            ei = "English";
        } else {
            $(".mage").html("<p>魔法禁师<br/>X：禁锢<br/>C：魔障<br/>V：炎爆术<br/>B:攻击<br/>Q:灵招</p>");
            $(".mech").html("<p>枪械师<br/>M：血怒<br/>,:闪现<br/>.：生物手雷<br/>/：攻击<br/>L：恐怖机器人</p>");
            $(".mage").css("letter-spacing", "5px");
            $(".mage").css("left", "5%");
            $(".mech").css("letter-spacing", "5px");
            $(".mech").css("right", "2%");
            $("#language").html("English");
            ei = "Chinese";
        }
    });
}
language();