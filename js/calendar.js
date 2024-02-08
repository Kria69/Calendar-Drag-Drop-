const screen_s = document.querySelectorAll('.screen')
const h1Element = document.querySelector('h1')
var currentDate = document.querySelector('.current-date')

var c

var Cal = function (divId) {
    this.divId = divId
    this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    this.Months = ['Январь', 'Февраль', 'Март',
        'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    this.MonthsGenitive = ['Января', 'Февраля', 'Марта',
        'Апреля', 'Мая', 'Июня', 'Июля', 'Августа',
        'Сентября', 'Октября', 'Ноября', 'Декабря']
    var d = new Date()
    this.currMonth = d.getMonth()
    this.currYear = d.getFullYear()
    this.currDay = d.getDate()
}

Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0
        this.currYear = this.currYear + 1
    } else {
        this.currMonth = this.currMonth + 1
    }
    this.showcurr()
}

Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11
        this.currYear = this.currYear - 1
    } else {
        this.currMonth = this.currMonth - 1
    }
    this.showcurr()
}

Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth)
}

Cal.prototype.showMonth = function (y, m) {
    var d = new Date(),
        firstDayOfMonth = new Date(y, m, 7).getDay(),
        lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
        lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate()

    const textMonths = this.Months[m] + ' ' + y
    h1Element.innerText = textMonths

    var html = '<table>'

    html += '<tr class="days">'
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>'
    }
    html += '</tr>'

    var i = 1
    do {
        var dow = new Date(y, m, i).getDay()

        if (dow == 1) {
            html += '<tr>'
        } else if (i == 1) {
            html += '<tr>'
            var k = lastDayOfLastMonth - firstDayOfMonth + 1
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>'
                k++
            }
        }

        var chk = new Date()
        var chkY = chk.getFullYear()
        var chkM = chk.getMonth()
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today" onclick="handleDayClick(' + i + ')">' + i + '</td>'
        } else {
            html += '<td class="normal" onclick="handleDayClick(' + i + ')">' + i + '</td>'
        }

        if (dow == 0) {
            html += '</tr>'
        } else if (i == lastDateOfMonth) {
            var k = 1
            for (dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>'
                k++
            }
        }
        i++
    } while (i <= lastDateOfMonth)

    html += '</table>'

    document.getElementById(this.divId).innerHTML = html
}

window.onload = function () {
    c = new Cal("divCal")
    c.showcurr()

    getId('btnNext').onclick = function () {
        c.nextMonth()
    }
    getId('btnPrev').onclick = function () {
        c.previousMonth()
    }
}

function getId(id) {
    return document.getElementById(id)
}

function handleDayClick(day) {
    screen_s[0].classList.add('up')
    screen_s[1].classList.remove('hidden')
    currentDate.innerHTML = '<span>' + day + '</span><br>' +
        '<span>' + c.MonthsGenitive[c.currMonth] + '</span><br>' +
        '<span>' + c.currYear + ' г.</span>'
}
