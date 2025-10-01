async function buscarAnime() {
    const input = document.getElementById('animeInput');
    const resultados = document.getElementById('resultados');
    const nombre = input.value.trim();
    
    if (!nombre) {
        resultados.innerHTML = '<p class="error">⚠️ Por favor, escribe un nombre</p>';
        return;
    }
    
    resultados.innerHTML = '<p>Buscando...</p>';
    
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nombre)}&limit=3`);
        const data = await response.json();
        
        if (data.data.length === 0) {
            resultados.innerHTML = '<p class="error">❌ No se encontraron resultados</p>';
            return;
        }
        
        resultados.innerHTML = data.data.map(anime => `
            <div class="anime-card">
                <h3>${anime.title}</h3>
                <p><strong>Episodios:</strong> ${anime.episodes || '?'}</p>
                <p><strong>Puntuación:</strong> ${anime.score || '?'}/10</p>
                <p><strong>Sinopsis:</strong> ${(anime.synopsis || 'No disponible').substring(0, 150)}...</p>
            </div>
        `).join('');
        
    } catch (error) {
        resultados.innerHTML = '<p class="error">❌ Error al buscar. Intenta más tarde.</p>';
    }
}

// Buscar al presionar Enter
document.getElementById('animeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarAnime();
    }
});
