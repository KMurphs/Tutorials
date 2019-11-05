import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import moment from 'moment';


import TestReactHookState from './Components/TestReactHookState';



const DATA: {timer: number; laps: number[]}= {
  timer: 43234,
  laps: [123456, 64565, 15545, 32425, 5645]
}





function Timer({ interval, style }: {interval: number, style: any}){
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={style}>{pad(Math.floor(duration.milliseconds()/10))}</Text>
    </View>
  )
}






function ButtonsRow({children}: {children: any}){
  return(
    <View style={[styles.buttonsRow]}>
      {children}
    </View>
  )
}

function RoundButton({title, 
                      textColor, 
                      backgroundColor, 
                      disabled, 
                      onPress}: 
                     {title: string, 
                      textColor: string, 
                      backgroundColor: string, 
                      disabled: boolean, 
                      onPress: () => void}){
  return(
    <TouchableOpacity style={[styles.roundButtonsOuterBorder, {backgroundColor}]}
                      onPress={() => (!disabled && onPress())}
                      activeOpacity={disabled ? 1 : 0.7}>
      <View style={[styles.roundButtons]}>
        <Text style={[styles.roundButtonsTitle, {color: textColor}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}





// type lapType = {
//   counter: number,
//   duration: number,
// }
function LapsTable({laps, timer}: {laps: Array<number>; timer: number}){
  // const completedLaps = laps.slice(1)
  const completedLaps = laps
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if(completedLaps.length >= 2){
    completedLaps.forEach(lap => {
      if(lap < min) min = lap
      if(lap > max) max = lap
    })
  }
  return (
    <ScrollView style={styles.lapContainer}>
      {[timer, ...laps].map((lap, index) => (
        <Lap key={laps.length - index + 1}
             counter={laps.length - index + 1}
             duration={lap}
             slowest={lap===max}
             fastest={lap===min}
             />
      ))}
    </ScrollView>
  )
}

function Lap({counter, duration, fastest, slowest}: 
             {counter: number, duration: number, fastest: boolean, slowest: boolean} ){
  const lapStyle = [
    styles.lapText,
    fastest && styles.lapFastest,
    slowest && styles.lapSlowest,
  ]

  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {counter}</Text>
      <Timer style={lapStyle} interval={duration}/>
    </View>
  )
}





export default function App() {

  const [start, setStart] = useState(0)
  const [now, setNow] = useState(0)
  const [laps, setLaps] = useState([])
  const [timerID, setTimerID] = useState(null)

  let timer = now - start


  let handleTimerStart = ()=>{
    let _now = new Date().getTime()
    setNow(_now)
    setStart(_now)
    setLaps([])

    setTimerID(setInterval(()=>{
      setNow(new Date().getTime())
    }, 100))

  }
  let handleTimerStop = ()=>{
    clearInterval(timerID)
    let _now = new Date().getTime()
    setLaps([_now - start, ...laps])
    setNow(0)
    setStart(0)
  }
  let handleTimerReset = ()=>{
    setNow(0)
    setStart(0)
    setLaps([])
  }
  let handleTimerResume = ()=>{
    let _now = new Date().getTime()
    setNow(_now)
    setStart(_now)

    setTimerID(setInterval(()=>{
      setNow(new Date().getTime())
    }, 10))
  }
  let handleNewLap = ()=>{
    let _now = new Date().getTime()
    setLaps([_now - start, ...laps])
    setStart(_now)
  }
  
  return (
    <View style={styles.container}>
      <Timer interval={laps.reduce((acc, lap) => acc + lap, timer)} style={styles.timer}/>
      
        {
          laps.length === 0 && start===0 && (
            <ButtonsRow>
              <RoundButton  title='Reset' 
                            textColor='#8b8b90' 
                            backgroundColor='#151515'
                            disabled={true}
                            onPress={handleTimerReset}/>
              <RoundButton  title='Start' 
                            textColor='#50D167' 
                            backgroundColor='#1B361F'
                            disabled={false}
                            onPress={handleTimerStart}/>
            </ButtonsRow>
          )
        }

        {
          start>0 && (
            <ButtonsRow>
              <RoundButton  title='Lap' 
                            textColor='#ffffff' 
                            backgroundColor='#3d3d3d'
                            disabled={false}
                            onPress={handleNewLap}/>
              <RoundButton  title='Stop' 
                            textColor='#e33935' 
                            backgroundColor='#3c1715'
                            disabled={false}
                            onPress={handleTimerStop}/>
            </ButtonsRow>
          )
        }

        {
          laps.length > 0 && start===0 && (
            <ButtonsRow>
              <RoundButton  title='Reset' 
                            textColor='#ffffff' 
                            backgroundColor='#3d3d3d'
                            disabled={false}
                            onPress={handleTimerReset}/>
              <RoundButton  title='Resume' 
                            textColor='#50D167' 
                            backgroundColor='#1B361F'
                            disabled={false}
                            onPress={handleTimerResume}/>
            </ButtonsRow>
          )
        }
      <LapsTable laps={laps} timer={timer}/>


    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  timer: {
    color: 'white',
    fontSize: 76,
    fontWeight: '200',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  roundButtons: {
    width: 76,
    height: 76,
    borderRadius: 38, //About half the size of the button
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  roundButtonsTitle: {
    fontSize: 18,
  },
  roundButtonsOuterBorder: {
    width: 80,
    height: 80,
    borderRadius: 40, //About half the size of the button
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "stretch",
    alignSelf: 'stretch',
    marginTop: 80,
    marginBottom: 30,
  },
  lapContainer: {
    alignSelf: 'stretch',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "stretch",
    alignSelf: 'stretch',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  lapText: {
    color: '#fff',
  },
  lapFastest: {
    color: '#4bc05f',
  },
  lapSlowest: {
    color: '#cc3531',
  },
});
