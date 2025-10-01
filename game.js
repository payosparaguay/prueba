class JuegoNave {
    constructor() {
        this.nave = document.getElementById('nave');
        this.posicion = 375;
        this.velocidad = 5;
        this.teclasPresionadas = {};
        this.touchActive = false;
        this.touchSide = null; // 'left' o 'right'
        
        this.iniciarControles();
        this.iniciarGameLoop();
    }
    
    iniciarControles() {
        // Controles de teclado
        document.addEventListener('keydown', (evento) => {
            this.teclasPresionadas[evento.key] = true;
        });
        
        document.addEventListener('keyup', (evento) => {
            this.teclasPresionadas[evento.key] = false;
        });
        
        // Controles táctiles
        document.addEventListener('touchstart', (evento) => {
            evento.preventDefault();
            const touchX = evento.touches[0].clientX;
            const naveRect = this.nave.getBoundingClientRect();
            const naveCenterX = naveRect.left + naveRect.width / 2;
            
            this.touchActive = true;
            this.touchSide = touchX < naveCenterX ? 'left' : 'right';
        });
        
        document.addEventListener('touchend', (evento) => {
            evento.preventDefault();
            this.touchActive = false;
            this.touchSide = null;
        });
        
        document.addEventListener('touchmove', (evento) => {
            evento.preventDefault();
            // Opcional: actualizar lado si el dedo se mueve
            if (this.touchActive) {
                const touchX = evento.touches[0].clientX;
                const naveRect = this.nave.getBoundingClientRect();
                const naveCenterX = naveRect.left + naveRect.width / 2;
                this.touchSide = touchX < naveCenterX ? 'left' : 'right';
            }
        });
    }
    
    iniciarGameLoop() {
        const actualizar = () => {
            // Movimiento por teclado
            if (this.teclasPresionadas['ArrowLeft']) {
                this.moverIzquierda();
            }
            if (this.teclasPresionadas['ArrowRight']) {
                this.moverDerecha();
            }
            
            // Movimiento táctil continuo
            if (this.touchActive) {
                if (this.touchSide === 'left') {
                    this.moverIzquierda();
                } else if (this.touchSide === 'right') {
                    this.moverDerecha();
                }
            }
            
            requestAnimationFrame(actualizar);
        };
        actualizar();
    }
    
    moverIzquierda() {
        if (this.posicion > 25) {
            this.posicion -= this.velocidad;
            this.actualizarPosicion();
        }
    }
    
    moverDerecha() {
        const anchoArea = document.querySelector('.game-area').offsetWidth;
        if (this.posicion < anchoArea - 25) {
            this.posicion += this.velocidad;
            this.actualizarPosicion();
        }
    }
    
    actualizarPosicion() {
        this.nave.style.left = `${this.posicion}px`;
    }
}

// Iniciar el juego
window.addEventListener('load', () => {
    new JuegoNave();
});