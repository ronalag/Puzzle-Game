
function PuzzleGame(rootElement, screenLocked) {
    var self = this;
    var lockScreen = screenLocked == true;
    var rows = 5;
    var cols = 5;
    var image = {
        path: "images/lake-side-1.jpg",
        width: "1024px",
        height: "600px"
    };
    var grid;

    function areValidCoordinates(i, j) {
        return i >= 0 && i < rows && j >= 0 && j < cols;
    }

    function checkHasWon() {
        var result = true;
        
        for(var i = 0; result && i < rows; i++) {
            for(var j = 0; result && j < cols; j++) {
                result = grid[i][j].isInCorrectPosition();
            }
        }

        if(result == true) {
            lockScreen = true;
            alert("You Win!");        
        }
    }

    function piece(domObj, i, j) {
        var that = this;
        that.domObj = domObj; 
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
                i: correct_i,
                j: correct_j,
                isWhiteBox: that.isWhiteBox
            };
            that.domObj.innerHTML = other.domObj.innerHTML;
            correct_i = other.correct_i;
            correct_j = other.correct_j;
            that.isWhiteBox = other.isWhiteBox;
            other.domObj.innerHTML = temp.html;
            other.correct_i = temp.i;
            other.correct_j = temp.j;
            other.isWhiteBox = temp.isWhiteBox;
        };
        
        that.isWhiteBox = false;
        
        function isDiagonal(i, j) {
            return that.i != i && that.j != j;
        }

        function canMove() {
            var i, j;
            for(i = that.i - 1; i <= that.i + 1; i++) {
                for(j = that.j - 1; j <= that.j + 1; j++) {
                    if(!(i == that.i && j == that.j) && areValidCoordinates(i, j) && grid[i][j].isWhiteBox && !isDiagonal(i, j)) {
                        return grid[i][j];
                    }
                }
            }

            return null;
        }

        function move(whiteBox) {
            if(whiteBox != null) {
                that.swap(whiteBox);
                return true;
            } else {
                return false;
            }
        };

        that.domObj.onclick = function() {
            if(lockScreen != true && move(canMove())) {
                checkHasWon();
            }
        }
    }
    
    function createPiece(container, x_offset, y_offset) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.style.width = image.width;
        img.style.height = image.height;
        img.setAttribute("src", image.path);
        img.style.position = "relative";
        img.style.top = "" + x_offset;
        img.style.left = "" + y_offset;
        div.style.height = "113px";
        div.style.width = "205px";
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
        var horOffset = 204.4;
        var verOffset = 120;

        for(var i = 0, x=0, y=0; i < rows; i++, x -= verOffset) {
            row = document.createElement("tr");
            for(var j = 0; j < cols; j++, y -= horOffset) {
                td = document.createElement("td");
                td.style.border = "1px solid #000";
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
        grid[rows-1][cols-1].isWhiteBox = true;
        rootElement.appendChild(table);
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
                grid[i][j].swap(grid[x][y]);
            }
        }
    }

    self.init = function() {
        createGrid();
        createTable();
        if(lockScreen != true) {
            randomize();
        }
    };
    
    (function () {
        self.init();
    })();
}

