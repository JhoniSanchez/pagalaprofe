import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Blog2 from "./components/Blog2";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Formblog from "./components/Formblog";
import Notification from "./components/Notification";
import "./app.css";
import FromFilters from "./components/FromFilters";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import datos from "../data.json";
import LocalBlog from "./components/LocalBlog";

console.log(datos.datos);
const Targeta = ({ blogs }) => {
  return (
    <div className="cuerpo2">
      <div className="gallery">
        {blogs.map((blog) => (
          <Blog2 key={blog.img} blog={blog} />
        ))}
      </div>
    </div>
  );
};
const Local = ({ blogs }) => {
  return (
    <div className="cuerpo2">
      <div className="gallery">
        {blogs.map((blog) => (
          <LocalBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const Targeta2 = ({ blogs }) => {
  return (
    <div className="cuerpo">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
const Targeta3 = ({ blogs }) => {
  return (
    <div className="cuerpo">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const App = () => {
  const [dataprincipal, setPrincipalData] = useState([]);

  const [blogs2, setBlogs2] = useState([]);
  const [blogs3, setBlogs3] = useState([]);
  const [blogs4, setBlogs4] = useState([]);
  const [user, setUser] = useState("USER");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, settile] = useState("");
  const [author, setauthor] = useState("");
  const [url, seturl] = useState("");
  const [message, setmessage] = useState(null);
  const [newblogs, setnewBlogs] = useState({});

  const [categoria, setcategoria] = useState("");

  const dele = async (id, title) => {
    const result = confirm(`Seguro Eliminar: ${title}`);
    if (result) {
      try {
        const response = await blogService.dele(id);
        const newdata = dataprincipal.filter((el) => el.id !== response.id);
        setPrincipalData(newdata);

        setmessage(`Blog Deleted ${response.title}`);
        console.log(response);
        console.log(newdata);
      } catch (error) {
        console.log(error);
        setmessage(error.response.data.message);
      }
    }
  };

  const compararProductosPorPrecio = (a, b) => {
    const productoA = Number(a.precio);
    const productoB = Number(b.precio);

    //         const productoA = a.producto;
    // const productoB = b.producto;

    if (productoA < productoB) {
      return 1;
    }
    if (productoA > productoB) {
      return -1;
    }
    return 0;
  };

  const compararProductosPorAZ = (a, b) => {
    // const productoA = Number(a.producto);
    // const productoB = Number(b.producto);

    // //     const productoA = Number(a.precio);
    // // const productoB = Number(b.precio);

        const productoA = a.producto;
    const productoB = b.producto;

    if (productoA < productoB) {
      return -1;
    }
    if (productoA > productoB) {
      return 1;
    }
    return 0;
  };







  // (a, b) => a.producto - b.producto

  //fue necesario dublicar las funciones por nada me funciono para que no haga referencia a memoria cuando se llama la data y asi no me afecte el metodo sort
  const porPrecio = async () => {
    // const RESPONSE =  datos

    // const RESPONSE = await blogService.getAll()
    // console.log(ee)
    // const catego = ee.filter(el => el.categoria === categoria)
    // console.log(catego)
    setcategoria("MUJER");
    //ES NECESARIO CREAR COPIAS INDEPENDIENTES, PORQUE LA ORDENACION CON EL METODO SORT, ES POR REFERENCIA A EE, SE ESTA APUNTANDO A LA MISMA SECCION DE MEMORIA,
    //como el ... solo hace copia superficial, se hizo uso del JSONparse Stringify para poder evadir la referneica
    const filter = datos.datos.sort(compararProductosPorPrecio);
    setPrincipalData(filter);
  };

  const porAZ = async () => {
    // const RESPONSE = await blogService.getAll()
    const filter3987 = datos.datos.sort(compararProductosPorAZ);
    setBlogs3(filter3987);
  };

  const addnewblog = async (e) => {
    e.preventDefault();

    try {
      console.log("Blog Nuevo", newblogs);
      await blogService.create({
        title: title,
        author: author,
        url: url,
        likes: "0",
        userId: "user.userId",
        User: "",
      });
      await porPrecio();
      setmessage(`Blog Add ${title}`);
    } catch (error) {
      setmessage(`${error.code}`);
      console.log(error);
    }
  };

  const comparaPrecioAZ = async () => {
    const datageneral = datos.datos
    // const RESPONSE = await blogService.getAll()
    const primera = datageneral.sort(compararProductosPorPrecio);
    const segunda = primera.sort(compararProductosPorAZ);
    // setBlogs3(segunda);
    // setPrincipalData(segunda);
  };

  
  useEffect(() => {
   porPrecio();
  //      porAZ();
 comparaPrecioAZ()
 
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("Primer render");
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [username])

  // const handleLogin = async (event) => {
  //   // setdata(null);
  //   try {
  //     event.preventDefault()
  //     console.log("Request Server", password)
  //     const response = await blogService.login({
  //       username: username,
  //       password: password,
  //     })
  //     window.localStorage.setItem(
  //       "loggedNoteappUser",
  //       JSON.stringify(response)
  //     )
  //     setUser(response)
  //     // blogService.setToken(response.token);
  //     console.log("Response Server", response)
  //     setUsername({})
  //     setPassword("")
  //   } catch (error) {
  //     setmessage(`${error.response.data.error}`)
  //     console.log(error)
  //   }
  // }
  const handleLoOff = () => {
    location.reload();

    return window.localStorage.removeItem("loggedNoteappUser");
  };

  const CARGACATEGORIA = (e) => {
    setcategoria(e.target.value);
  };

  useEffect(() => {
    const filter3987 = dataprincipal.sort(comparaPrecioAZ);

    let catego = filter3987.filter((el) => el.categoria === categoria);
    let catego3 = blogs3.filter((el) => el.categoria === categoria);
 

    setBlogs2(catego);
       if(categoria == "TODO"){
    setBlogs2(filter3987);

    }
    setBlogs4(catego3);
  }, [categoria]);

  console.log;
  let ruta = "";

  const rutaa = window.location.href;
  if (rutaa == "https://frontend-paca.onrender.com/ventas-az") {
    ruta = "ab";
  } else if (
    rutaa == "https://frontend-paca.onrender.com/administracion14152024"
  ) {
    ruta = "adm";
  }
  const aa = useParams();

  
  let total = blogs2.reduce((t, item) => t + (Number(item.precio) || 0), 0);

const cantidadMostrando = blogs2.filter(item => item.mostrar == "1").length;
  console.log(cantidadMostrando);
  return (
    <div className="app"> 
      {/* <div className="encabezado"> */}
      <div className={`encabezado ${ruta}`}>
        <h2>PACA GINITA { total.toLocaleString('en-US')}.00</h2>
        <label className="llllll" htmlFor="">
          CATEGORIA
        </label>
        <select name="CATEGORIA" className="llllll" onChange={CARGACATEGORIA}>
          <option value="MUJER">BOLSOS</option>  
          <option value="NIÑOS">NIÑOS</option>
          <option value="CALZADO">CALZADOS</option>

          <option value="PERSONAL">PERSONAL</option>
          <option value="ADORNOS">ADORNO</option>

          <option value="COCINA">COCINA</option>
          <option value="HOGAR">HOGAR</option>

          <option value="CRISTALES">CRISTALES</option>
          <option value="ELECTRODOMESTICO">ELECTRO</option>
          <option value="TODO">TODOS</option>
         
        </select>{" "}
        {/* {blogs2.length} Art. */}
          {cantidadMostrando} Art.

      
        <img
          className="mom"
          src="https://raw.githubusercontent.com/JhoniSanchez/paga-ginita/master/public/mom.jpg"
          alt=""
        />
      </div>

      {/* <FromFilters />
     
     */}
      {/* <Notification
        message={message}
        setmessage={setmessage}
      /> */}
      {
        // !user && (
        //   <Login
        //     // handleLogin={handleLogin}
        //     username={username}
        //     setUsername={setUsername}
        //     password={password}
        //     setPassword={setPassword}
        //   />
        // )
      }
      {/* {user && ( */}
      {/* <div> */}
      {
        // user !== null && (
        // <Formblog
        //   addnewblog={addnewblog}
        //   title={title}
        //   settile={settile}
        //   author={author}
        //   setauthor={setauthor}
        //   url={url}
        //   seturl={seturl}
        // />
        // <FromFilters />
        // )
      }

      {/* <h3 style={{ display: "inline" }}>User: {user.username}</h3>    {user && (
            <input
              type="button"
              value={"Cerrar Sesion"}
              onClick={() => handleLoOff()}
            />
          )} */}


      <BrowserRouter basename="/pagalaprofe">
        <Routes>
          <Route path="/" element={<Targeta blogs={blogs2} />}></Route>
            <Route path="/local" element={<Local blogs={blogs2} />}></Route>
          <Route
            path="/administracion14152024"
            element={<Targeta2 blogs={blogs2} />}
          ></Route>
          <Route
            path="/ventas-az"
            element={<Targeta3 blogs={blogs4} />}
          ></Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="cuerpo">
        {blogs2.map((blog) => (
          <Blog key={blog.id} blog={blog} dele={dele} />
        ))}
      </div> */}

      {/* </div> */}
      {/* ) */}
      {/* } */}
    </div>
  );
};

export default App;
