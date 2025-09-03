import { useEffect, useRef, useState } from "react";
// import { FcLike } from "react-icons/fc";

// import "../../src/app.css"
import blogs from "../services/blogs";

const Blog2 = ({ blog, dele }) => {
  const [like, setlikes] = useState(0);
  const [act, setact] = useState(blog.actualizado);
  const [visible, setvisible] = useState(blog.mostrar);
  const [nuevaData, setnuevaData] = useState(undefined);
  const [cambio, setcambio] = useState(false);
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [precio, setprecio] = useState(blog.precio);
  const [ver, setver] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  // useEffect(() => {
  // }, [cambio])

  // console.log(blog)

  let aa = like === 0 ? 1 : like + 1;
  // const date = {
  //   producto: blog.producto,
  //   categoria: blog.categoria,
  //   precio: nuevaData.precio,
  //   disponible: blog.disponible,
  //   color: blog.color,
  //   tamano: blog.tamano,
  //   codigo: blog.codigo,
  //   ubicacion: blog.ubicacion,
  //   actualizado: nuevaData.actualizado,
  //   mostrar: blog.mostrar,
  //   likes: blog.likes + aa,
  // }

  const date2 = {
    producto: blog.producto,
    categoria: blog.categoria,
    disponible: blog.disponible,
    color: blog.color,
    tamano: blog.tamano,
    codigo: blog.codigo,
    ubicacion: blog.ubicacion,
    actualizado: act + 1,
    mostrar: blog.mostrar,
    likes: blog.likes + aa,
  };
  const date3 = {
    mostrar: !blog.mostrar,
  };

  // console.log(cambio)
  const uplikes = async (id, data) => {
    setlikes(() => like + 1);
    await blogs.update(id, data);
  };

  const actualizado = async (e, id, data) => {
    // console.log(date2)
    console.log(e.target, id, data, nuevaData);
    setnuevaData(() => act + 1);
    setact(() => act + 1);
    await blogs.update(id, { actualizado: act + 1 });
  };

  const mostrar = async (e, id, data) => {
    console.log(e.target.name, "***", data);
    setnuevaData(() => ({ [e.target.name]: !blog.mostrar }));

    setvisible(!visible);

    await blogs.update(id, { mostrar: !blog.mostrar });
  };

  const actualizarDatos = async (id, data) => {
    console.log(id, data);
    setprecio(data.precio);
    await blogs.update(id, data);
    setcambio(!cambio);
  };

  const vert = () => {
    setver(!ver);
  };
  // console.log(blog.img)

  let img = 100;
  if (Number(blog.img) < 100) {
    img = 100;
  } else if (Number(blog.img) < 200) {
    img = 200;
  } else if (Number(blog.img) < 300) {
    img = 300;
  } else if (Number(blog.img) < 400) {
    img = 400;
  } else if (Number(blog.img) < 500) {
    img = 500;
  } else if (Number(blog.img) < 600) {
    img = 600;
  } else if (Number(blog.img) < 700) {
    img = 700;
  } else if (Number(blog.img) < 800) {
    img = 800;
  } else if (Number(blog.img) < 900) {
    img = 900;
  } else if (Number(blog.img) < 1000) {
    img = 1000;
  } else if (Number(blog.img) < 1100) {
    img = 1100;
  } else if (Number(blog.img) < 1500) {
    img = 1500;
  } else if (Number(blog.img) < 1600) {
    img = 1600;
  } else if (Number(blog.img) < 1700) {
    img = 1700;
  } else if (Number(blog.img) < 1800) {
    img = 1800;
  }

  const imageUrl = `https://raw.githubusercontent.com/JhoniSanchez/imagenes/main/${img}/${blog.img}.JPG`;

  const mensaje = `Me interesa el articulo ${blog.producto} *codigo: ${blog.ubicacion}-${blog.img}, precio: RD$ ${blog.precio}* ${imageUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=18098997894&text=${encodeURIComponent(
    mensaje
  )}`;

  const link = `https://raw.githubusercontent.com/JhoniSanchez/imagenes/main/${img}/${blog.img}.jpg`;
  const link2 = `.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20.%20https://github.com/JhoniSanchez/img2/blob/master/${img}/${blog.img}.jpg?raw=true`;
  return (
    // <div className="blogbody">
    // <div className="gallery">{}
    <div
      className={blog.mostrar === 1 ? "gallery-item" : "gallery-item-oculto"}
      style={{ display: blog.mostrar == 1 ? "block" : "none" }}
    >
      <img
        className={blog.mostrar == 1 ? "imgvisible" : "imgoculto"}
        ref={imgRef}
        src={
          // isVisible && blog.mostrar == 1
          // ?
          `https://raw.githubusercontent.com/JhoniSanchez/imagenes/main/${img}/${blog.img}.JPG`
          // : ""
        }
        alt=""
        loading="lazy"
        onClick={() => vert()}
      />
      <div className="ppp">
        <div className="price2">
          {blog.mostrar == 0 ? (
            "NO DISPONIBLE"
          ) : (
            <span>RD$ {blog.precio} </span>
          )}{" "}
        </div>
        <div className="cod">
          {<p> </p>} {<p> </p>}
          {blog.ubicacion}
          {blog.img}
        </div>
      </div>

      <div className="item-details">
        <div className="ver" style={{ display: ver ? "block" : "none" }}>
          {blog.mostrar === 0 ? (
            "No disponible"
          ) : (
            <span> {blog.producto} </span>
          )}

          <p className="price">
            {blog.mostrar === 0 ? (
              "No disponible"
            ) : (
              <span>RD$ {blog.precio} </span>
            )}
          </p>
          <span className="Wa">
            <button>
              <a
                target="_blank"
                href={`https://api.whatsapp.com/send/?phone=18098997894&text=${link}%20Hola%20Profe,%20me%20interesa%20el%20articulo%20${blog.producto}%20*codigo:%20${blog.ubicacion}-${blog.img}*`}
              >
                {blog.ubicacion}-{blog.img}{" "}
              </a>
            </button>
          </span>
          <button className="Wa2">
            <a target="_blank" href={whatsappUrl}>
              Enviar mensaje por WhatsApp
            </a>
            {/* <a
              target="_blank"
              href={`https://api.whatsapp.com/send/?phone=18098997894&text=Hola%20Profe,%20me%20interesa%20el%20articulo%20${blog.producto}%20codigo:%20${blog.ubicacion}-${blog.img}%20`}
            >
              Preguntar por WhatsApp
            </a> */}
          </button>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Blog2;
