$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        generateDateStr: function(){
            var d = new Date(),
                days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                months = ["January", "February", "March", "April", "May", "June", "July",
                            "August", "September", "October", "November", "December"],
                //hoursStr = (d.getHours() + 1) > 12 ? d.getHours() - 11 : (d.getHours() + 1),
                timeStr = (d.getHours() + 1) + ":" + (d.getMinutes() + 1) + ":" + (d.getSeconds() + 1);

            return " -  " + months[d.getMonth()] + " " + d.getDate() + ", " +
                            d.getFullYear() + ", " + days[d.getDay()] + " " + timeStr;
        },
        //generateDateStr();

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                var dateContent = octopus.generateDateStr();
                octopus.addNewNote(newNoteContent.val() + dateContent);
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content;
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});