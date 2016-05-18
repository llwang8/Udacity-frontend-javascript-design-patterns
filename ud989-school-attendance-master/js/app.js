/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */

(function(){
    var model = {
        init: function() {
            if (!localStorage.attendance) {
                console.log('Creating attendance records...');
                function getRandom() {
                    return (Math.random() >= 0.5);
                }

                var nameColumns = $('tbody .name-col'),
                    attendance = {};

                nameColumns.each(function() {
                    var name = this.innerText;
                    attendance[name] = [];

                    for (var i = 0; i <= 11; i++) {
                        attendance[name].push(getRandom());
                    }
                });

                localStorage.attendance = JSON.stringify(attendance);
            }
        },
        getAllAttendance: function(){
            return JSON.parse(localStorage.attendance);
        }

    };

    var octopus = {
        init: function(){
            model.init();
            view.init();
        },
        // Count a student's missed days
        countMissing: function () {
            $allMissed.each(function() {
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;

                dayChecks.each(function() {
                    if (!$(this).prop('checked')) {
                        numMissed++;
                    }
                });

                $(this).text(numMissed);
            });
        }

    };

    var view = {
        init: function(){
            this.allMissed = $('tbody .missed-col'),
            octopus.countMissing();
            this.render();
        },

        render: function(){
            // Check boxes, based on attendace records
            $.each(attendance, function(name, days) {
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function(i) {
                    $(this).prop('checked', days[i]);
                });
            });
        }
    };

    var updateView = {
        init: function(){
            this.allCheckboxes = $('tbody input');
            // When a checkbox is clicked, update localStorage
            $allCheckboxes.on('click', function() {
                var studentRows = $('tbody .student'),
                    newAttendance = {};

                studentRows.each(function() {
                    var name = $(this).children('.name-col').text(),
                        $allCheckboxes = $(this).children('td').children('input');

                    newAttendance[name] = [];

                    $allCheckboxes.each(function() {
                        newAttendance[name].push($(this).prop('checked'));
                    });
            });
        },

        render: function(){

        }
    }

    octopus.init();

});

