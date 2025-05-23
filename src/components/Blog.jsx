import { useEffect, useRef, useState } from "react"
import { FcLike } from "react-icons/fc";

// import "../../src/app.css"
import blogs from "../services/blogs"

const Blog = ({ blog, dele }) => {
  const [like, setlikes] = useState(0)
  const [act, setact] = useState(blog.actualizado)
  const [visible, setvisible] = useState(blog.mostrar)
  const [nuevaData, setnuevaData] = useState(undefined)
  const [cambio, setcambio] = useState(false)
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [precio, setprecio] = useState(blog.precio)
  const [catubi, setcatubi] = useState( { categoria: blog.categoria, ubicacion: blog.ubicacion, producto:blog.producto } )
  console.log(catubi)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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

  let aa = like === 0 ? 1 : like + 1
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
  }
  const date3 = {
    mostrar: !blog.mostrar,
  }

  // console.log(cambio)
  const uplikes = async (id, data) => {
    setlikes(() => like + 1)
    await blogs.update(id, data)
  }


  const actualizado = async (e, id, data) => {
    // console.log(date2)
    console.log(e.target, id, data, nuevaData)
    setnuevaData(() => (act + 1))
    setact(() => act + 1)
    await blogs.update(id, { "actualizado": act + 1 })
  }


  const mostrar = async (e, id, data) => {
    console.log(e.target.name, "***", data);
    setnuevaData(() => ({ [e.target.name]: !blog.mostrar }))


    setvisible(!visible)

    await blogs.update(id, { mostrar: !blog.mostrar })
  }


  const actualizarDatos = async (id, data) => {
    console.log(id, data);
    setprecio(data.precio)
    await blogs.update(id, data)
    setcambio(!cambio)

  }

  // console.log(blog.img)

  let img = 100;
  if (Number(blog.img) < 100) {
    img = 100;
  } else if (Number(blog.img) < 200) {
    img = 200;
  } else if (Number(blog.img) < 300) {
    img = 300;
  } else if (Number(blog.img)< 400) {
    img = 400;
  } else if (Number(blog.img) < 500) {
    img = 500;
  } else if (Number(blog.img)< 600) {
    img = 600;
  }

  const cambiacategoria = (e) => {
    setcatubi({ ...catubi, [e.target.name]:e.target.value })

  }
  const actualizarcatubi = async (id, catubi) => {
    console.log(id, catubi);
    await blogs.update(id, catubi)
    setcambio(!cambio)
  }
  // let img = 100;
  // if (blog.img <= 103) {
  //   img = 100
  // }
  // else if (blog.img < 204) {
  //   img = 200
  // }

  // else if (blog.img < 306) {
  //   img = 300
  // }

  // else if (blog.img < 406) {
  //   img = 400
  // }
  // else if (blog.img < 505) {
  //   img = 500
  // }
  // else if (blog.img < 600) {
  //   img = 600
  // }

  return (
    <div className="blog">
      <h4 style={{ "display": "inline", "color": "#5c6b74" }}>{blog.producto}
        {/* - {blog.img       } */}
      </h4>

      <div className="padre-blog">

        <div className="hijo-blog1">

          <img
            ref={imgRef}
            // src= { isVisible ? `https://github.com/JhoniSanchez/img/blob/master/${img}/${blog.img}.jpg?raw=true` :""
            src={isVisible ? `https://raw.githubusercontent.com/JhoniSanchez/imagenes/main/${img}/${blog.img}.JPG` : ""
            }
            alt=""
            loading="lazy"
          />
        </div>

        <div className="hijo-blog2">

          <div className={`precio-${cambio}`}> <span><b>RD${precio} pesos  </b></span><button className={`btn-${cambio}`} onClick={() => setcambio(!cambio)}> {cambio == false ? "Cambiar" : "Cancelar"}</button> <button className={`validar-${visible}`} onClick={(e) => mostrar(e, blog.id, date3)} name="mostrar">{visible ? "V" : "O"}</button></div>
          {cambio && <div><input placeholder="Nuevo Precio" type="number" name="precio" value={nuevaData} onChange={(e) => setnuevaData(e.target.value)}></input><button name="precio" onClick={(e) => actualizarDatos(blog.id, { ...blog, [e.target.name]: nuevaData })}>Guardar</button></div>}

          {/* <div><b>Disponible</b>: {blog.disponible}</div>
        <div><b>Color</b>: {blog.color}</div>
        <div><b>Tamano</b>: {blog.tamano}</div>
        <br />
        <div><b>Categoria</b>: {blog.categoria}</div> */}

          <span><b>Cod</b>: {blog.codigo} </span>
          <span><b>Ubi</b>: {blog.ubicacion}</span>

{
cambio &&
    <div>

            <select name="categoria" value={catubi.categoria} id="" onChange={cambiacategoria}>
              {/* <option value="ADORNO">ADORNO</option>
              <option value="ADORNO-NAVIDAD">NAVIDAD</option>
              <option value="COCINA">COCINA</option>
              <option value="CRISTALERIA">CRISTALERIA</option>
              <option value="ELECTRODOMESTICO">ELECTRODOMESTICO</option>
              <option value="PERSONAL">PERSONAL</option>
            </select> */}


        {/* <select name="CATEGORIA" className="llllll" onChange={CARGACATEGORIA}> */}
          <option value="MUJER">MUJER...</option>
          <option value="CALZADO">CALZADOS</option>

          <option value="PERSONAL">PERSONAL</option>
          <option value="ADORNOS">ADORNO</option>

          <option value="COCINA">COCINA</option>
          <option value="HOGAR">HOGAR</option>

          <option value="CRISTALES">CRISTALES...</option>
          <option value="ELECTRODOMESTICO">ELECTRO...</option>
          <option value="NAVIDAD">NAVIDAD</option>
        </select>{" "}


            <select name="ubicacion" value={catubi.ubicacion} id="" onChange={cambiacategoria}>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
              <option value="C5">C5</option>
              <option value="C6">C6</option>
              <option value="C8">C8</option>
              <option value="C9">C9</option>
              <option value="AC10">AC10</option>
              <option value="C10C7">C10C7</option>
              <option value="C11">C11</option>
              <option value="C12">C12</option>
              <option value="C13">C13</option>
            </select>

<input  type="text" name="producto" value={catubi.producto} onChange={cambiacategoria}></input>
            <button name="precio" onClick={(e) => actualizarcatubi(blog.id, catubi)}>Guardar</button>
          </div>
}
        


          <span className="Wa"><button><a target="_blank" href={`https://api.whatsapp.com/send/?phone=18098997894&text=Hola%20Profe,%20me%20interesa%20el%20articulo%20${blog.producto}%20*codigo:%20${blog.ubicacion}-${blog.codigo}*`}>Preguntar</a></button></span>

          <br />
          <button name="actualizado" className="likes" onClick={(e) => actualizado(e, blog.id, date2)}><FcLike /> <i className="valor">{act}</i></button>
          {blog.mostrar ? "" : <h3 className="ago">Agotado</h3>}
          {/* <div>
          {blog.author}
        </div> */}
          {/* <button onClick={() => uplikes(blog.id, date)}>Likes: {like + blog.likes}</button> */}
        </div>
      </div>





      {/* <button onClick={() => { dele(blog.id, blog.title) }}>Delete</button> */}



    </div>
  )
}



export default Blog