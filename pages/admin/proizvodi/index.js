import styles from "./proizvodi.module.css";
import { useRouter} from 'next/router'
import Proizvodi from "../../../components/Admin/Proizvodi/proizvodi";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Cookies from "cookies";
import Filter from "../../../components/Search/Filter/filter";
import url from 'url';
import querystring from 'querystring';
export async function getServerSideProps({ req, res }) {
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var user = "";
  var email = "";
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  var offset = 0;
  if (authToken == undefined) {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }
  await fetch(PROTOCOL + "://" + HOST + "/api/checkauth", {
    headers: { "auth-token": authToken },
  })
    .then((res) => res.json())
    .then((data) => {
      email = data.email;
    });

  await fetch(PROTOCOL + "://" + HOST + "/api/getuser", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.json())
    .then((data) => {
      user = data.user;
    });
  if (user.partnertype != "admin") {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }

  //----------------------------------------------------
  var urlParse = url.parse(req.url);
  var query = querystring.parse(urlParse.query);
  if(query.page != undefined){
    var page = query.page;
  }else{
    var page = 1;
  }
  const data = await fetch(
    PROTOCOL + "://" + HOST + "/api/get?offset=" + offset+"&page="+page
  )
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      data: data,
    },
  };
}

var loading = false;
var search4code = "";
var sub4code = "";
var kolona4code = "";
var offset = 0;
var disScroll = false;
var lastScroll = 0;
var currentpage = 0;
const proizvodi = (props) => {
  const [pro, setPro] = useState(props.data);
  const [searchKolona, setSearchKolona] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [pages,setPages] = useState(0);
	const [loaddata,setLoaddata] = useState(false);
  const [pagination,setPagination] = useState([])
  const testRef = useRef();
  const router = useRouter()
  var queryPage = parseInt(router.query.page)
	currentpage = (isNaN(queryPage) || router.query.page == 0) ? 1 : router.query.page
  var HOST = process.env.NEXT_PUBLIC_HOST;
  var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
  useEffect(()=>{
		
		var numRows;
		var queryPagination;
		var numPerPage = 20;
		var page = parseInt(1, 10) || 0;
		var numPages;
		var skip = page * numPerPage;
		fetch(PROTOCOL +'://'+HOST+'/api/get?&count=1&admin=1').then(res => res.json())
				.then(data => {
          
					numRows = data[0]["count(*)"];
    				numPages = Math.ceil(numRows / numPerPage);
					setPages(numPages)
					setLoaddata(true)
				})
		
	},[])
  useEffect(() => {
    search4code = searchValue;
  }, [searchValue]);
  useEffect(() => {
    kolona4code = searchKolona;
  }, [searchKolona]);

  useEffect(()=>{

		// PAGINATION -----------------------------------

		if(pages == 0){
			setPagination([])
			return
		}
		var listpages = []
		for(let i = 1; i <= pages; i++){
			listpages.push(<Link key={i} href={'/admin/proizvodi?page='+i}>{' '+i+' '}</Link>)
			setPagination(listpages)
		}
		// PAGINATION -----------------------------------
	},[pages])
 
  function onChange(e) {
    
    offset = 0;
    disScroll = false;
    lastScroll = 0;
    var searchR = "";
    var searchK = "";
    if (e.target.name != "selectsearch") {
      searchR = e.target.value;
      searchK = searchKolona;
      setSearchValue(searchR);
    } else {
      searchK = e.target.value;
      searchR = searchValue;
    }
    fetch(
      PROTOCOL +
        "://" +
        HOST +
        "/api/searchpro?search=" +
        searchR +
        "&searchkolona=" +
        searchK +
        "&offset=" +
        offset+"&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setPro([]);
        setPro(data.results);
        router.push('/admin/proizvodi?page=1');
        var numRows;
        var queryPagination;
        var numPerPage = 20;
        var page = parseInt(1, 10) || 0;
        var numPages;
        var skip = page * numPerPage;
        fetch(
          PROTOCOL +
            "://" +
            HOST +
            "/api/searchpro?search=" +
            searchR +
            "&searchkolona=" +
            searchK +
            "&offset=" +
            offset+"&page=1&count=1"
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            numRows = data[0]["count(*)"];
            numPages = Math.ceil(numRows / numPerPage);
  
          setPages(numPages)
          setLoaddata(true)
          });
      });
  }
  function onChangeSearch(e) {
    setSearchKolona(e.target.value);
    onChange(e);
  }
  useEffect(()=>{
		var queryPage = parseInt(router.query.page)
		currentpage = (isNaN(queryPage) || router.query.page == 0) ? 1 : router.query.page
		
		setLoaddata(false)
		var numRows;
		var queryPagination;
		var numPerPage = 20;
		var page = parseInt(1, 10) || 0;
		var numPages;
		var skip = page * numPerPage;
		if(searchValue != ""){

	fetch(
    PROTOCOL +
        "://" +
        HOST +
        "/api/searchpro?search=" +
        searchValue +
        "&searchkolona=" +
        searchKolona +
        "&offset=" +
        offset+"&page="+currentpage
  )
	.then(res => res.json())
	.then(data => {

		setPro([])
		setPro(data.results)
		setLoaddata(true)
	})
		
		}else{
			
			fetch(PROTOCOL +'://'+HOST+'/api/get?page='+currentpage).then(res => res.json())
			.then(data => {

				setPro([])
				setPro(data)
				setLoaddata(true)
				
			})
		}

		
		
	},[router.query.page])
  return (
    <div className={styles.proizvodii}>
      <div className={styles.headingg}>
        <h3>Proizvodi </h3>
        
        <Filter
          change={(e) => onChange(e)}
          placeholder="Pretrazi proizvode..."
        ></Filter>
        <select
          className={styles.selectt}
          style={{ marginLeft: "300px" }}
          name="selectsearch"
          value={searchKolona}
          onChange={(e) => onChangeSearch(e)}
        >
          <option value="name">Ime</option>
          <option value="code">Sifra</option>
          <option value="kataloski_broj">Kataloski broj</option>
        </select>
        
      </div>
      
      <div ref={testRef}>
      <h5 style={{marginTop:'100px',marginLeft:'100px'}} >{pagination}</h5>
        <Proizvodi data={pro} />
      </div>
    </div>
  );
};

export default proizvodi;
