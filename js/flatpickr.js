config={
    mode: "range",
    minDate: "today",
    dateFormat: "d-m-Y",
    locale: {
        firstDayOfWeek: 1,
        weekdays: {
            shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
        }, 
        months: {
            shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
            longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
    },
    onClose: function(selectedDates, dateStr, instance) {
        let daysInRange = document.getElementsByClassName('inRange');
        console.log(daysInRange);
        let daysLengthTotal = daysInRange.length>=0 ? daysInRange.length + 1 : 0;
        console.log(daysLengthTotal);
        return daysLengthTotal;

    }
}

flatpickr("input[type=datetime-local]", config);
