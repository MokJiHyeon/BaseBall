$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_HR',
    success: function (data) {
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_AVG',
    success: function (data) {
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_ERA',
    success: function (data) {
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});

$.ajax({
    type: 'POST',
    url: '/LeaderBoard/Leader_SO',
    success: function (data) {
        console.log(data);
    },
    error: function (e) {
        alert(e.responseText);
    }
});