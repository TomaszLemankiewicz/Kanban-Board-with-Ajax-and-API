var board = {
    name: 'Tablica Kanban',
    addColumn: function (column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

$('.create-column').click(function () {
    var columnName  = prompt('Wpisz nazwę kolumny');

    $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
            name: columnName
        },
        success: function (response) {
            var column = new Column(response.id, columnName);
            board.addColumn(column);
        }
    });
});

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: 'ul',
        placeholder: 'card-placeholder',
        handle: ".card-header",
        cancel: ".card-toggle"
    }).disableSelection();
}