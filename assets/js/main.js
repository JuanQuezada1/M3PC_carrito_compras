// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }
    agregarProducto(producto, cantidad) {
        this.productos.push({ ...producto, cantidad });
    }
    calcularTotal() {
        return this.productos.reduce((total, item) => total + item.precio * item.cantidad, 0);
    }
    mostrarDetalles() {
        if (this.productos.length === 0) {
            return "El carrito está vacío.";
        }
        let detalles = "Productos en el carrito:\n";
        this.productos.forEach(item => {
            detalles += `${item.cantidad} x ${item.nombre} - $${item.precio * item.cantidad}\n`;
        });
        return detalles;
    }
    finalizarCompra() {
        const total = this.calcularTotal();
        return `La suma total de la compra es: $${total}`;
    }
}

// Productos disponibles con precios
const productosDisponibles = [
    new Producto("Leche", 1000),
    new Producto("Pan de molde", 2000),
    new Producto("Queso", 1200),
    new Producto("Mermelada", 890),
    new Producto("Azúcar", 1300)
];
const carrito = new Carrito();

// Función para mostrar productos disponibles
function mostrarProductos() {
    let listaProductos = "Productos disponibles:\n";
    productosDisponibles.forEach((producto, index) => {
        listaProductos += `${index + 1}.- ${producto.nombre} $${producto.precio}\n`;
    });
    listaProductos += "Botón aceptar para continuar";
    alert(listaProductos);
}

// Función para agregar producto al carrito
function agregarProductoAlCarrito() {
    let numeroProducto;
    do {
        numeroProducto = parseInt(prompt("Ingresa el número del producto que deseas agregar al carrito:"));
    } while (isNaN(numeroProducto) || numeroProducto < 1 || numeroProducto > productosDisponibles.length);
    let cantidad;
    do {
        cantidad = parseInt(prompt("Ingresa la cantidad de unidades:"));
    } while (isNaN(cantidad) || cantidad <= 0);
    const productoSeleccionado = productosDisponibles[numeroProducto - 1];
    carrito.agregarProducto(productoSeleccionado, cantidad);
    alert(`Agregado ${cantidad} de ${productoSeleccionado.nombre} al carrito.`);
}

// Función principal para el flujo de la compra
function flujoCompra() {
    let agregarMasProductos = true;
    while (agregarMasProductos) {
        mostrarProductos();
        agregarProductoAlCarrito();
        alert(carrito.mostrarDetalles());
        agregarMasProductos = confirm("¿Deseas agregar más productos al carrito?");
    }
    alert(carrito.finalizarCompra());
}