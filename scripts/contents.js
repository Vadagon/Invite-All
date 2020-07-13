$(document).ready(function() {
    $(document).on('click', '#inviteAllButton', function(){
        getInviteUsersArray();
    });

    $(document).on('click', 'a[role="button"]', function(){
        var href = $(this).attr('href');

        if(href !== undefined){
            var isModal = href.indexOf("reaction");

            if(isModal !== -1){
                setTimeout(function(){
                    var dialogTitle = $('._59s7 > div > div > div > div > div:nth-child(2) > div:nth-child(1)');
                    dialogTitle.after('<button class="_42ft mhs _4jy0 _4jy3 _517h _51sy" id="inviteAllButton" style="float: right; margin: -32px 0;">Invite All</button>');
                }, 600);
            }
        }
    });
});

function inviteUser(usersInviteButtons, arrayKey){
    console.log(usersInviteButtons[arrayKey] + ' invited...');

    if($('#' + usersInviteButtons[arrayKey]).length !== 0){
        document.querySelector('#' + usersInviteButtons[arrayKey]).click();
    }
}

function getInviteUsersArray(){
    $('#inviteAllButton').html('In process...');

    // How much users need invite?;
    var usersInviteButtons = new Array;

    $('._42ft').each(function(){
        var href = $(this).attr('ajaxify');

        if(href !== undefined){
            var isInvite = href.indexOf("post_like_invite");

            if(isInvite !== -1){
                usersInviteButtons.push($(this).attr('id'));
            }
        }
    });

    console.log('We need invite: ' + usersInviteButtons.length + ' users;');

    // Invite users with delay;
    // Gen delay;
    var delayTime = parseInt(getRandomInt(4, 6) + '000');
    // Run iteration with delay;
    Rx.Observable.interval(delayTime).take(usersInviteButtons.length).subscribe((x) => inviteUser(usersInviteButtons, x));

    // We invite all users;
    setTimeout(function(){
        setTimeout(function(){
            // Click "See more button" if exist;
            clickSeeMore();
        }, 2000);
    }, (usersInviteButtons.length + 1) * delayTime);
}

function clickSeeMore(){
    var seeMoreButton = $('#reaction_profile_pager > div > a');

    if(seeMoreButton.length !== 0){
        console.log('See More click');

        document.querySelector('#reaction_profile_pager > div > a').click();

        console.log('Waiting 3 seconds before we send invites again...');
        setTimeout(function(){
            getInviteUsersArray();
            return true;
        }, 3000);
    }   else{
        console.log('Ready. All users successfully invited!');
        $('#inviteAllButton').html('Invite All');
        chrome.runtime.sendMessage({greeting: "theEnd"}, function() {
            console.log('Notification init...');
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}