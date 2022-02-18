import DateOf from "../../components/MainPage/Whiteboard/Date";
import List from "../../components/MainPage/Whiteboard/List";
import Description from "../../components/MainPage/Whiteboard/Description";
import Value from "../../components/MainPage/Whiteboard/Value";
import Balance from "../../components/MainPage/Whiteboard/Balance";
import BlncSpan from "../../components/MainPage/Whiteboard/BlncSpan";

export default function UpdateWhiteboard({balance, loading}){

    if(loading){
        return(<p>loading</p>)
    }


    if(balance === (null || '') || balance.length === 0){
        return(
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100%'}}>
                <p> Não há registros de entrada ou saída </p>
            </div>
        )
    }
    else{
        let saldo = 0;
        return(
        <>
            <List style={{display:'flex', justifyContent: 'start', alignItems: 'center', color:'black'}}>
                {balance.map((array) => {

                
                if(array.transaction.type === 'earning'){
                    saldo = saldo + parseFloat(array.transaction.value);
                }
                else{
                    saldo = saldo - parseFloat(array.transaction.value);
                }

                let formattedValue = Intl.NumberFormat('de-DE').format(array.transaction.value);

                return(
                    <li style={{width:'100%', display:'flex', fontSize:'16px'}}> 
                        <DateOf> {array.time}</DateOf> <Description> <>{array.transaction.description}</> </Description> <Value color={array.transaction.type === 'earning' ? 'green' : 'red'}><>{formattedValue}</></Value> 
                    </li>
                )})}
            </List>
            <Balance>
                <BlncSpan color={'#000'} style={{fontWeight:'700'}}>SALDO:</BlncSpan>
                <BlncSpan color={ saldo > 0 ? '#03AC00' : saldo < 0 ? '#C70000' : '#000'}>{Intl.NumberFormat('de-DE').format(saldo)}</BlncSpan>
            </Balance>
        </>
        )
    }
}