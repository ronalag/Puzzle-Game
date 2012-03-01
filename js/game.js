
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

    function piece(domObj, i, j) {
        var that = this;
        that.domObj = domObj; /* Reference to DOM object for piece*/
        var correct_i = i;
        var correct_j = j;
        that.i = i; 
        that.j = j;

        that.swap = function(other) {
            var temp = new piece(that.domObj, that.i, that.j);
            that.domObj = other.domObj;
            that.i = other.i;
            that.j = other.j;
            other.domObj = temp.domObj;
            other.i = temp.i;
            other.j = temp.j;
        };

        that.move = function() {
            
        };
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
                swap(grid[i][j].domObj, grid[x][y].domObj);
            }
        }
    }

    self.move = function(i, j) {
        
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
