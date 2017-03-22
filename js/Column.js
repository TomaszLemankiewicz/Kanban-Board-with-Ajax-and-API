function Column(id, name) {
    var self = this;
    this.id = id;
    this.name = name || "Brak nazwy";
    this.$element = createColumn();

    function createColumn() {
        var $column = $('<div>').addClass('column'),
            $columnHeader = $('<div>').addClass('column-header'),
            $columnBody = $('<div>').addClass('column-body'),
            $columnTitle = $('<h2>').addClass('column-title').text(self.name),
            $columnCardList = $('<ul>').addClass('column-card-list'),
            $columnDelete = $('<button>').addClass('btn-delete').text('x'),
            $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

        $columnDelete.click(function () {
            self.deleteColumn();
        });

        $columnAddCard.click(function () {
            var cardDescription = prompt("Wpisz opis karty");

            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardDescription,
                    bootcamp_kanban_column_id: self.id
                },
                success: function (response) {
                    var card = new Card(response.id, cardDescription);
                    self.addCard(card);
                }
            });
        });

        $columnHeader.append($columnTitle)
            .append($columnAddCard)
            .append($columnDelete);

        $columnBody.append($columnCardList);

        $column.append($columnHeader)
            .append($columnBody);

        return $column;
    }
}

Column.prototype = {
    addCard: function (card) {
        this.$element.find('ul').append(card.$element);
    },

    deleteColumn: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });
    }
};