class JuegoNave {
    constructor() {
        this.nave = document.getElementById('nave');
        this.posicion = 375; // Posición inicial (centro)
        this.velocidad = 10;
        this.anchoNave = 50; // Ancho aproximado del triángulo
        
        this.iniciarControles();
    }
    
    iniciarControles() {
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'ArrowLeft') {
                this.moverIzquierda();
            } else if (evento.key === 'ArrowRight') {
                this.moverDerecha();
            }
            
            
            
        });
        
        
        document.addEventListener('touchstart', (evento) => {
        const touchX = evento.touches[0].clientX;
        const naveRect = this.nave.getBoundingClientRect();
        const naveCenterX = naveRect.left + naveRect.width / 2;
        
        if (touchX < naveCenterX) {
            // Tocó a la izquierda de la nave
            this.moverIzquierda();
        } else {
            // Tocó a la derecha de la nave  
            this.moverDerecha();
        }
    });
        
        
    }
    
    moverIzquierda() {
        // Limitar movimiento para no salir de la pantalla
        if (this.posicion > this.anchoNave / 2) {
            this.posicion -= this.velocidad;
            this.actualizarPosicion();
        }
    }
    
    moverDerecha() {
        const anchoArea = document.querySelector('.game-area').offsetWidth;
        // Limitar movimiento para no salir de la pantalla
        if (this.posicion < anchoArea - this.anchoNave / 2) {
            this.posicion += this.velocidad;
            this.actualizarPosicion();
        }
    }
    
    actualizarPosicion() {
        this.nave.style.left = `${this.posicion}px`;
    }
}

// Iniciar el juego cuando se cargue la página
window.addEventListener('load', () => {
    new JuegoNave();
});
