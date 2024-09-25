// when calling, should define length of div it's contained in as this will take up the full width of that

export default function Legend() {
    // make a bunch of small canvases to be able to draw node icon in legend

    const canvasIds = [
        "hall",
        "conf",
        "dept",
        "elev",
        "exit",
        "info",
        "labs",
        "rest",
        "bath",
        "retl",
        "stai",
        "serv",
    ];
    const contexts: { [key: string]: CanvasRenderingContext2D | null } = {};

    for (let i = 0; i < canvasIds.length; i++) {
        const canvas = document.getElementById(
            canvasIds[i],
        ) as HTMLCanvasElement | null;
        const context = canvas?.getContext("2d");
        if (context !== undefined) {
            contexts[canvasIds[i]] = context;
        }
    }

    // draw shapes in their respective mini-canvases
    for (const key in contexts) {
        const context = contexts[key];
        if (context) {
            const drawFunction = {
                hall: drawSquare,
                conf: drawRectangle,
                dept: drawCircle,
                elev: drawOval,
                exit: drawHexagon,
                info: drawTriangle,
                labs: drawRhombus,
                rest: drawParallelogram,
                bath: drawTrapezoid,
                retl: drawOctagon,
                stai: drawPentagon,
                serv: drawSeptagon,
            }[key];

            if (drawFunction) {
                drawFunction(context, 15, 15);
            } else {
                console.log(`No draw function found for key: ${key}`);
            }
        } else {
            console.log(
                `Canvas not supported or canvas element not found for key: ${key}`,
            );
        }
    }

    return (
        <div className="rounded-2 border-white drop-shadow-xl z-10 hidden md:block">
            <div className="bg-secondary dark:bg-secondary-element p-3 rounded-lg shadow-md text-foreground">
                <h2 className="text-xl font-bold text-center">Legend</h2>
                <ul>
                    <li className="flex items-center">
                        <canvas id="hall" width={30} height={30} />
                        <span className="mx-auto">Hall</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="conf" height={30} width={30} />
                        <span className="mx-auto">Conference</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="dept" height={30} width={30} />
                        <span className="mx-auto">Department</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="elev" height={30} width={30} />
                        <span className="mx-auto">Elevator</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="exit" height={30} width={30} />
                        <span className="mx-auto">Exit</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="info" height={30} width={30} />
                        <span className="mx-auto">Info</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="labs" height={30} width={30} />
                        <span className="mx-auto">Labs</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="rest" height={30} width={30} />
                        <span className="mx-auto">Restroom</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="bath" height={30} width={30} />
                        <span className="mx-auto">Bathroom</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="retl" height={30} width={30} />
                        <span className="mx-auto">Retail</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="stai" height={30} width={30} />
                        <span className="mx-auto">Stairs</span>
                    </li>
                    <li className="flex items-center">
                        <canvas id="serv" height={30} width={30} />
                        <span className="mx-auto">Service</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

//================================================================================//

function drawHexagon(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    const size = 7;

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";

    for (let side = 0; side <= 6; side++) {
        const angle = ((2 * Math.PI) / 6) * side;
        const x = xMult + size * Math.cos(angle);
        const y = yMult + size * Math.sin(angle);

        if (side === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.fillStyle = "#ddde1f";
    ctx.fill();
    ctx.stroke();
}

function drawCircle(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    const size = 6;

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(xMult, yMult, size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#e04545";
    ctx.fill();
    ctx.stroke();
}

function drawSquare(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const size: number = 10;

    ctx.rect(xMult - size / 2, yMult - size / 2, size, size);
    ctx.fillStyle = "#0a2ce1";
    ctx.fill();
    ctx.stroke();
}

function drawRectangle(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const size = 10;

    const halfSize = size / 2;
    const centerX = xMult;
    const centerY = yMult;

    ctx.rect(
        centerX - halfSize - size * 0.25,
        centerY - halfSize,
        size + size * 0.5,
        size,
    );
    ctx.fillStyle = "#25982a";
    ctx.fill();
    ctx.stroke();
}

function drawTriangle(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const size = 14;

    const height = size * (Math.sqrt(3) / 2);
    const centerX = xMult;
    const centerY = yMult + 2;

    ctx.moveTo(centerX - size / 2, centerY + height / 3);
    ctx.lineTo(centerX + size / 2, centerY + height / 3);
    ctx.lineTo(centerX, centerY - (2 * height) / 3);
    ctx.closePath();

    ctx.fillStyle = "#1fe18a";
    ctx.fill();
    ctx.stroke();
}

function drawOval(ctx: CanvasRenderingContext2D, xMult: number, yMult: number) {
    ctx.beginPath();
    const radiusX = 8;
    const radiusY = 6;

    const rotation = 0;
    ctx.ellipse(xMult, yMult, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    ctx.fillStyle = "#da8f08";
    ctx.fill();
    ctx.stroke();
}

function drawRhombus(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const diag = 14;

    ctx.moveTo(centerX, centerY - diag / 2);
    ctx.lineTo(centerX + diag / 2, centerY);
    ctx.lineTo(centerX, centerY + diag / 2);
    ctx.lineTo(centerX - diag / 2, centerY);
    ctx.closePath();

    ctx.fillStyle = "#9608da";
    ctx.fill();
    ctx.stroke();
}

function drawParallelogram(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const base = 14;
    const height = 9;
    const skew = 4;

    ctx.moveTo(centerX - base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2 + skew, centerY - height / 2);
    ctx.lineTo(centerX - base / 2 + skew, centerY - height / 2);
    ctx.closePath();

    ctx.fillStyle = "#5cdbda";
    ctx.fill();
    ctx.stroke();
}

function drawTrapezoid(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const base = 16;
    const top = 9;
    const height = 9;

    ctx.moveTo(centerX - base / 2, centerY + height / 2);
    ctx.lineTo(centerX + base / 2, centerY + height / 2);
    ctx.lineTo(centerX + top / 2, centerY - height / 2);
    ctx.lineTo(centerX - top / 2, centerY - height / 2);
    ctx.closePath();

    ctx.fillStyle = "#ce24d4";
    ctx.fill();
    ctx.stroke();
}

function drawOctagon(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const side = 5;

    const radius = side / (2 * Math.sin(Math.PI / 8));

    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#0b6009";
    ctx.fill();
    ctx.stroke();
}

function drawPentagon(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const side = 8;

    const radius = side / (2 * Math.sin(Math.PI / 5));

    for (let i = 0; i < 5; i++) {
        const angle = Math.PI / 2 + ((2 * Math.PI) / 5) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#82a7f6";
    ctx.fill();
    ctx.stroke();
}

function drawSeptagon(
    ctx: CanvasRenderingContext2D,
    xMult: number,
    yMult: number,
) {
    ctx.beginPath();
    const centerX = xMult;
    const centerY = yMult;
    const side = 6;

    const radius = side / (2 * Math.sin(Math.PI / 7));

    for (let i = 0; i < 7; i++) {
        const angle = Math.PI / 2 + ((2 * Math.PI) / 7) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();

    ctx.fillStyle = "#67c537";
    ctx.fill();
    ctx.stroke();
}
