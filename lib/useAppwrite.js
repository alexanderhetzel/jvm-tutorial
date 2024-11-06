import {useEffect, useState} from "react";
import {Alert} from "react-native";

const useAppwrite = (fn, limit = 5) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // Funktion zum Laden von Daten, abhängig von einem übergebenen `offset`
    const fetchData = async (newOffset = offset, isPagination = false) => {
        setIsLoading(true);
        try {
            const response = await fn(newOffset, limit); // Verwende `newOffset`
            if (isPagination) {
                setData((prevData) => [...prevData, ...response]);
            } else {
                setData(response);
            }
            setHasMore(response.length === limit);
            setOffset(newOffset + limit); // Aktualisiere `offset` basierend auf dem neuen `offset`-Wert
        } catch (error) {
            Alert.alert("Error - useAppwrite", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(0); // Initiales Laden startet bei `offset = 0`
    }, []);

    // `refetch` setzt `offset` zurück und lädt Daten erneut von `offset = 0`
    const refetch = () => {
        setOffset(0);
        fetchData(0); // Starte den Abruf von `offset = 0`
    };

    const fetchMore = () => {
        if (hasMore && !isLoading) {
            console.info("fetching more...")
            fetchData(offset, true); // Lade weitere Daten basierend auf dem aktuellen `offset`
        }
    };

    return { data, isLoading, refetch, fetchMore, hasMore };
};


export default useAppwrite;