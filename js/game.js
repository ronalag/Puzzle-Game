
perform = function () {
    var second = document.getElementById('second');
    var third = document.getElementById('third');
    var temp = second.innerHTML;
    
    second.innerHTML = third.innerHTML;
    third.innerHTML = temp;
};

function PuzzleGame() {
    var self = this;
    
    var rows = 5;
    var cols = 5;
    var image = {
        path: "images/landscape.jpg",
        width: "960px",
        height: "700px"
    };
    var grid;

    function areValidCoordinates(i, j) {
        return i >= 0 && i < rows && j > 0 && j < cols;
    }

    function checkHasWon() {
        var result = true;
        
        for(var i = 0; result && i < rows; i++) {
            for(var j = 0; result && j < cols; j++) {
                result = grid[i][j].isInCorrectPosition();
            }
        }

        return result;
    }

    function piece(domObj, i, j) {
        var that = this;
        that.domObj = domObj; /* Reference to DOM object for piece*/
        var correct_i = i;
        var correct_j = j;
        that.i = i; 
        that.j = j;
        
        that.isInCorrectPosition = function() {
            return that.i == correct_i && that.j == correct_j;
        };

        that.swap = function(other) {
            var temp = {
                html: that.domObj.innerHTML,
                i: that.i,
                j: that.j
            };
            that.domObj.innerHTML = other.domObj.innerHTML;
            that.i = other.i;
            that.j = other.j;
            other.domObj.innerHTML = temp.html;
            other.i = temp.i;
            other.j = temp.j;
        };
        
        that.isWhiteBox = function() {
            return correct_i == rows - 1 && correct_j == cols - 1;
        };

        function canMove() {
            var i, j;
            for(i = that.i - 1; i <= that.i + 1; i++) {
                for(j = that.j - 1; j < that.j + 1; j++) {
                    if(i != that.i && j != that.j && areValidCoordinates(i, j) && grid[i][j].isWhiteBox()) {
                        return grid[i][j];
                    }
                }
            }

            return null;
        }

        function move(whiteBox) {
            if(whiteBox != null) {
                /*swap(grid[that.i][that.j], whiteBox);*/
                that.swap(whiteBox);
                return true;
            } else {
                return false;
            }
        };

        that.domObj.onclick = function() {
            /* */
            if(move(canMove())) {
                checkHasWon();
            }
        }
    }
    
    function createPiece(container, x_offset, y_offset) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.style.width = "960px";
        img.style.height = "700px";
        img.setAttribute("src", image.path);
        img.style.position = "relative";
        img.style.top = "" + x_offset;
        img.style.left = "" + y_offset;
        div.style.height = "140px";
        div.style.width = "192px";
        div.style.overflow= "hidden";   
        div.appendChild(img);
        container.appendChild(div);
    }

    function createGrid() {
        grid = new Array(rows);
       
        for(var i = 0; i < grid.length; i++) {
            grid[i] = new Array(cols);
        }
    }

    function createTable() {
        var table = document.createElement("table");
        table.style.borderSpacing = "0";
        table.style.margin = "0";
        table.style.padding = "0";
        table.style.borderCollapse = "collapse";
        table.style.border = "1px solid #000000";
        
        var td;
        var horOffset = 192;
        var verOffset = 140;

        for(var i = 0, x=0, y=0; i < rows; i++, x -= verOffset) {
            row = document.createElement("tr");
            for(var j = 0; j < cols; j++, y -= horOffset) {
                td = document.createElement("td");
                if(i == rows - 1 && j == cols - 1) {
                    td.innerHTML = "&nbsp;";
                } else {
                    createPiece(td, x, y);
                }
                grid[i][j] = new piece(td, i, j);
                row.appendChild(td);
            }
            y=0; 
            table.appendChild(row);
        }
        document.getElementsByTagName("body")[0].appendChild(table);
        alert(checkHasWon());
    }
    
    function swap(x, y) {
       var temp = x.innerHTML;
       x.innerHTML = y.innerHTML;
       y.innerHTML = temp;
    }

    function randomize() {
        var x, y;            

        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < cols && (rows - 1 != i && cols - 1 != j); j++) {
                x = Math.floor(Math.random() * rows);
                y = Math.floor(Math.random() * cols);
                if(x == rows - 1 && y == cols -1) {
                    y--;
                }
                /*swap(grid[i][j].domObj, grid[x][y].domObj);*/
                grid[i][j].swap(grid[x][y]);
            }
        }
        alert(checkHasWon());
    }

    self.init = function() {
        createGrid();
        createTable();
        randomize();
    };

    (function () {
        self.init();
    })();
}

window.onload = function() {
    var game = new PuzzleGame();
};
