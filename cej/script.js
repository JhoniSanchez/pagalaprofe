document.addEventListener('DOMContentLoaded', () => {
    const excelFile = document.getElementById('excelFile');
    const jsonOutput = document.getElementById('jsonOutput');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const downloadJsonButton = document.getElementById('downloadJsonButton'); // Nuevo elemento

    let currentJsonData = null; // Variable para almacenar el JSON generado

    excelFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        currentJsonData = null; // Reiniciar datos JSON al seleccionar un nuevo archivo
        downloadJsonButton.style.display = 'none'; // Ocultar el botón

        if (!file) {
            jsonOutput.textContent = 'Ningún archivo seleccionado.';
            errorMessage.style.display = 'none';
            return;
        }

        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
            errorMessage.textContent = 'Por favor, selecciona un archivo Excel (.xlsx o .xls).';
            errorMessage.style.display = 'block';
            jsonOutput.textContent = 'El JSON convertido aparecerá aquí...';
            return;
        }

        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        jsonOutput.textContent = 'Procesando...';

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const json = XLSX.utils.sheet_to_json(worksheet);

                // Almacenar el JSON generado
                currentJsonData = JSON.stringify(json, null, 2);
                jsonOutput.textContent = currentJsonData;

                loadingMessage.style.display = 'none';
                downloadJsonButton.style.display = 'block'; // Mostrar el botón de descarga

            } catch (error) {
                console.error("Error al procesar el archivo Excel:", error);
                errorMessage.textContent = `Error al procesar el archivo: ${error.message}. Asegúrate de que sea un archivo Excel válido.`;
                errorMessage.style.display = 'block';
                jsonOutput.textContent = 'El JSON convertido aparecerá aquí...';
                loadingMessage.style.display = 'none';
                downloadJsonButton.style.display = 'none'; // Asegurarse de que el botón esté oculto en caso de error
            }
        };

        reader.onerror = (error) => {
            console.error("Error al leer el archivo:", error);
            errorMessage.textContent = `Error al leer el archivo: ${error.message}`;
            errorMessage.style.display = 'block';
            jsonOutput.textContent = 'El JSON convertido aparecerá aquí...';
            loadingMessage.style.display = 'none';
            downloadJsonButton.style.display = 'none'; // Asegurarse de que el botón esté oculto en caso de error
        };

        reader.readAsArrayBuffer(file);
    });

    // Event listener para el botón de descarga
    downloadJsonButton.addEventListener('click', () => {
        if (currentJsonData) {
            const blob = new Blob([currentJsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // Sugiere un nombre de archivo para la descarga, basado en el nombre original del Excel
            const originalFileName = excelFile.files[0] ? excelFile.files[0].name.split('.')[0] : 'data';
            a.download = `${originalFileName}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Libera la URL del objeto
        } else {
            errorMessage.textContent = 'No hay datos JSON para descargar.';
            errorMessage.style.display = 'block';
        }
    });
});