import pickRandomColor from "../../modules/color/RandomColorPicker";
import DOMColoredPoint from "../../modules/types/DOMColoredPoint";

export

class Plane2D {

    static POINT_HIT_COLOR = "green";
    static POINT_MISS_COLOR = "red";

    canvas: HTMLCanvasElement;

    radius: number = 1;

    scale: number = 1.2;

    linesXAxis: number = 8;
    linesYAxis: number = 8;

    points: DOMPoint[] = [];

    constructor
    (radius: number, canvas: HTMLCanvasElement) {
        this.radius = radius;
        this.canvas = canvas;

        this.render();

        this.initListeners();
    }

    public clear() {
        this.points = [];
        this.render();
    }

    public throwPoint(point: DOMColoredPoint | DOMPoint) {
        this.points.push(point);

        this.render();
    }

    public initListeners() {
        // MOUSE CLICK ON THE DESK

        this.canvas.addEventListener("click", event => {
            const rect = this.canvas.getBoundingClientRect();
            const xCanvas = event.clientX - rect.left;
            const yCanvas = event.clientY - rect.top;

            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;

            const gridStepX = this.canvas.width / this.linesXAxis;
            const gridStepY = this.canvas.height / this.linesYAxis;

            // Смещение от центра в пикселях
            const dx = xCanvas - centerX;
            const dy = centerY - yCanvas; // инвертируем Y, чтобы ось шла вверх

            // Переводим в логические координаты (в единицах, как на графике)
            const logicalX = dx / (this.scale * gridStepX);
            const logicalY = dy / (this.scale * gridStepY);

            const canvasRealCoordinates = new DOMPoint(logicalX, logicalY, this.radius);
            console.log("Логические координаты:", canvasRealCoordinates);

            // throw custom event "sn-throw-point"
            let throwPointEvent = new CustomEvent("sn-throw-point", {
                detail: canvasRealCoordinates
            });

            document.dispatchEvent(throwPointEvent);
        });
    }

    public render() {

        let context: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (!context) return;

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        context.save();
        context.strokeStyle = '#e0e0e0';
        context.lineWidth = 0.5;
        
      const gridStepX = this.canvas.width / this.linesXAxis;
        for (let x = 0; x <= this.canvas.width; x += gridStepX) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, this.canvas.height);
            context.stroke();
        }

        // Горизонтальные линии сетки
        const gridStepY = this.canvas.height / this.linesYAxis;
        for (let y = 0; y <= this.canvas.height; y += gridStepY) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(this.canvas.width, y);
            context.stroke();
        }
        context.restore();

        context.save();
        context.fillStyle = "#AAAAAA";
        context.beginPath();
        context.arc(
            centerX, 
            centerY, 
            this.radius * this.scale * gridStepX, 
            0, 
            -Math.PI/2,
            true
        );
        context.lineTo(centerX, centerY);
        context.fill()
        context.restore();

        context.save();
        context.beginPath();
        context.fillStyle = "#AAAAAA";
        context.rect(centerX, centerY, -this.radius * this.scale * gridStepX, this.radius/2 * this.scale * gridStepY);
        context.fill();
        context.restore();

        context.save();
        let path = new Path2D();
        context.fillStyle = "#AAAAAA";
        path.moveTo(centerX, centerY);
        path.lineTo(
            centerX,
            centerY + this.radius * this.scale * gridStepY / 2,
        );
        path.lineTo(
            centerX + this.radius * this.scale * gridStepX,
            centerY,
        );
        context.fill(
            path
        );
        context.restore();

        context.save();
        context.strokeStyle = '#000000';
        context.lineWidth = 2;

        // Ось X
        context.beginPath();
        context.moveTo(0, centerY);
        context.lineTo(this.canvas.width, centerY);
        context.stroke();

        // Ось Y
        context.beginPath();
        context.moveTo(centerX, 0);
        context.lineTo(centerX, this.canvas.height);
        context.stroke();

        context.beginPath();
        // Стрелка X
        context.moveTo(this.canvas.width - 10, centerY - 5);
        context.lineTo(this.canvas.width, centerY);
        context.lineTo(this.canvas.width - 10, centerY + 5);
        // Стрелка  Y
        context.moveTo(centerX - 5, 10);
        context.lineTo(centerX, 0);
        context.lineTo(centerX + 5, 10);
        context.fillStyle = '#000000';
        context.fill();


        // Подписи осей
        context.font = '10px monospace';
        context.fillStyle = '#444444';
        context.fillText('X', this.canvas.width - 15, centerY - 10);
        context.fillText('Y', centerX + 10, 15);
        context.fillText('O', centerX - 15, centerY + 15); // Начало координат

        for (let i = 1; i <= this.linesXAxis / 2 - 1; i++) {
            const value = i / this.scale;
            
            // Положительные X
            context.fillText(value.toFixed(1), centerX + gridStepX * i - 5, centerY + 15);
            // Отрицательные X
            context.fillText((-value).toFixed(1), centerX - gridStepX * i - 10, centerY + 15);
        }

        for (let i = 1; i <= this.linesYAxis / 2 - 1; i++) {
            const value = i / this.scale;

            // Положительные Y
            context.fillText(value.toFixed(1), centerX + 10, centerY - gridStepY * i + 5);
            // Отрицательные Y
            context.fillText((-value).toFixed(1), centerX + 10, centerY + gridStepY * i + 5);
        }

        context.restore();

        if (this.points.length > 0) {
            context.save();
            
            this.points.forEach(point => {
                
                if (point instanceof DOMColoredPoint) {
                    context.fillStyle = point.color;
                } else context.fillStyle = pickRandomColor();
  
                const canvasX = centerX + point.x * this.scale * (gridStepX);
                const canvasY = centerY - point.y * this.scale * (gridStepY); 
                
                context.beginPath();
                context.arc(
                    canvasX, 
                    canvasY, 
                    5, 
                    0, 
                    2 * Math.PI
                );
                context.fill();
            });

            context.restore();
        }

        console.log(this);
    }
}