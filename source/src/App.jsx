const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [firebaseData, setFirebaseData] = useState(null);

  // --- EFECTO 1: ESCUCHA DE DATOS ESTABLE ---
  useEffect(() => {
    const resultsRef = ref(db, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(updateResults(data)); 
        setFirebaseData(data); 
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // --- EFECTO 2: LÓGICA DE NAVEGACIÓN CORREGIDA ---
  useEffect(() => {
    if (!firebaseData) return;

    const { showResultPage, showVotingScreen } = firebaseData;
    const path = location.pathname;

    // 1. Si los resultados están ACTIVOS, mandamos a Results (a menos que sea panel de control o mensajes)
    const isControlOrAdmin = path === "/control-panel" || path === "/val-jan";
    
    if (showResultPage && !isControlOrAdmin && path !== "/results") {
      navigate("/results");
      return;
    }

    // 2. Si alguien intenta entrar a /vote pero la votación está CERRADA, lo mandamos al Home
    if (showVotingScreen === false && path === "/vote") {
      navigate("/");
      return;
    }

    // Nota: Eliminamos la lógica que obligaba a ir a votación. 
    // Ahora el usuario puede estar en "/" (Home) y decidir si entrar a votar o no.

  }, [firebaseData, location.pathname, navigate]);

  return (
    <AppContainer>
      <AnimatedBackground />
      <FloatingIconsWrapper>
        <FloatingIcons />
      </FloatingIconsWrapper>

      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/control-panel" element={<ControlPanel />} />
          <Route path="/traer" element={<WhatToBring />} />
          <Route path="/val-jan" element={<ValJan />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};
export default App;

