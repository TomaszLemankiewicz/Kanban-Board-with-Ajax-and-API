function Card(id, name) {
    var self = this;
    this.id = id;
    this.name = name || 'Nie podano nazwy';
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card'),
            $cardHeader = $('<div>').addClass('card-header'),
            $cardBody = $('<div>').addClass('card-body'),
            $cardTitle = $('<h3>').addClass('card-title').text('ID karty : ' + self.id),
            $cardDescription = $('<p>').addClass('card-description').text(self.name),
            $cardButtonWrapper = $('<div>').addClass('buttons-wrapper'),
            $cardDelete = $('<button>').addClass('btn-delete').text('x'),
            $cardToggle = $('<span>').addClass('ui-icon ui-icon-minusthick card-toggle');

        $cardDelete.click(function () {
            self.removeCard();
        });

        $cardToggle.click(function () {
            self.toggleCard();
        });

        $cardButtonWrapper.append($cardToggle)
            .append($cardDelete);

        $cardHeader.append($cardTitle)
            .append($cardButtonWrapper);

        $cardBody.append($cardDescription);

        $card.append($cardHeader)
            .append($cardBody);

        return $card;
    }
}

Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
             data: {
                    id: self.id
                },
            success: function () {
                self.$element.remove();
            }
        });
    },
    toggleCard: function () {
        var icon = this.$element;
        icon.closest(".card").find("span").toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".card").find(".card-body").toggle();
    }
};