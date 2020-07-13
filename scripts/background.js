chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.greeting === "theEnd")
            var opt = {
                type: 'list',
                title: 'facebook Invite All',
                message: 'Primary message to display',
                priority: 1,
                items: [{ title: '', message: "All users successfully invited."}],
                iconUrl:'../icons/icon48.png'

            };
        chrome.notifications.create('id', opt, function(id) {});
    });