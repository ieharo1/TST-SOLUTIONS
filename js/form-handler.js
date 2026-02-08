
// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validate required fields
        if (!nombre || !email || !mensaje) {
            alert('Por favor complete los campos obligatorios (*)');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `*Nuevo contacto desde TST Website*%0A%0A` +
                               `*Nombre:* ${nombre}%0A` +
                               `*Email:* ${email}%0A` +
                               `*Asunto:* ${asunto || 'Sin asunto'}%0A%0A` +
                               `*Mensaje:*%0A${mensaje}%0A%0A` +
                               `*Fecha:* ${new Date().toLocaleString()}`;
        
        // Encode for WhatsApp
        const whatsappURL = `https://wa.me/593997962747?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Send to WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('✅ Información enviada a WhatsApp. Se abrirá la aplicación para confirmar el envío.');
    });
}