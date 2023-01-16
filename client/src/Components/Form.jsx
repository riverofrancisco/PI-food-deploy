import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getDiets, getRecipes, BACKEND_PATH } from '../actions/actions';
import './Form.css'


export default function Form(){
const history = useHistory();
const dispatch = useDispatch();

//// STATES //////
const allDiets = useSelector((state) => state.diets);

useEffect(()=>{
  if(allDiets.length === 0){
    dispatch(getDiets())}
}, [dispatch])

const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    stepBYstep: [],
    diets: [],
    image: '',
})

const [currentStep, setCurrentStep] = useState({description: ''});
const [newDiet, setNewDiet] = useState({name: ''})
const [error, setError] = useState(' ');

//// VALIDATIONS ///////

//HEALTHSCORE //
function validateHS(e) {//Numero entre 1 y 100
    const {value, name} = e.target;
    
    if(value > 100 || value <= 0) {
      console.log(`${value} no cumple con el HS`)
      setError('El healthScore debe ser un número entre el 1 y el 100');
    } else {
      setError('')
      setInput({
        ...input,
        [name] : value
      })
    }
  };

// TITLE AND SUMMARY //
function validateTyS(e) {
    const {value, name} = e.target;
    const title = document.getElementById("titleInput");
    const summary = document.getElementById("summaryInput");
  
    if((name === 'title' && value) && summary.value){
        setError('')
        setInput({
          ...input,
          [name] : value
        })
    } else if ((name === 'summary' && value) && title.value){
        setError('')
        setInput({
          ...input,
          [name] : value
        })
      } else {
          setError('Falta enviar datos obligatorios')
          setInput({
            ...input,
            [name] : value
          })
        }
};

// IMAGE //
function validateImage(event) {//debe ser una url.
    const {value, name} = event.target;
    
    if(/https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)) {
    setError('')
    setInput({
      ...input,
      [name] : value
    })
    } else {
      setError('El valor ingresado en Image debe ser una URL');
      console.log(`${value} no cumple con el formato Image`)
    }
  };


//// HANDLES ///////
const handleChange = (event) => {
    const {value, name} = event.target;
 
    if(name === 'currentStep'){
            setCurrentStep({
              description: value
            })
    } else if (name === 'newDiet') {
            setNewDiet({
              name: value.toLowerCase()
            })
    } else {
            setInput({...input,
              [name]: value
            });
    } 
};

//// DINAMIC INPUTS ////////
const handleStepsChange = (event) => {
  const steps = [...input.stepBYstep];
  steps[event.target.id[0]] = event.target.value;

  setInput({
    ...input,
    stepBYstep: steps
  })
}

const handleDietChange = (event) => {
  const selecteDiets = [...input.diets];
  selecteDiets[event.target.id[0]] = event.target.value;

  setInput({
    ...input,
    diets: selecteDiets
  })
}

const Adder = (event) => {
  const {name, value} = event.target;
  if (name === 'AddStep') {
    var step = currentStep;
    setInput({
      ...input,
      stepBYstep: [...input.stepBYstep , step.description]
    });
    setCurrentStep({description: ''})

  } else if (name === 'AddDiet') {
    var diet = newDiet;
    setInput({
      ...input,
      diets: [...input.diets , diet.name]
    });
    setNewDiet({name: ''})
  } else if (name === 'AddExDiet') {
    setInput({
      ...input,
      diets: [...input.diets , value]
    })  
  }
}

const Deleter = (e) => {
  e.preventDefault();
  const {name, value, id} = e.target;
  console.log(id);
  if(name === 'step'){
      const tobeDeleted = document.getElementById(`${id[0]}step`);
      console.log(tobeDeleted);
      let steps = [...input.stepBYstep];
      console.log(steps);
      let newSteps = steps.filter((element) => element !== tobeDeleted.value);
      console.log(newSteps);
      setInput({
        ...input,
        stepBYstep: newSteps
      });
    } else if (name === 'diet') {
      const tobeDeleted = document.getElementById(`${id[0]}diet`);
      console.log(tobeDeleted);
      let currentDiets = [...input.diets];
      console.log(currentDiets);
      let newDiets = currentDiets.filter((element) => element !== tobeDeleted.value);
      console.log(newDiets);
      setInput({
        ...input,
        diets: newDiets
      });
  }
  
  
}

//// SUBMIT ///////
const enableSubmit = () => {
  const submitButton = document.getElementById("btnSubmit");
  if(error !== ''){
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
} 

useEffect(() => {
  enableSubmit()
})

const onSubmit = (event) => {
  
  event.preventDefault();
  console.log(input)
  
  fetch(`https://pi-food-deploy-production-7b0f.up.railway.app/recipes`,{
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      "Content-type": "application/json"
    }
  })

  dispatch(getRecipes());
  dispatch(getDiets());
  alert(`Recipe "${input.title}" created succesfully.`)
  history.push("/home");

  console.log('Receta creada');
  
  setInput({    
              title: '',
              summary: '',
              healthScore: 0,
              stepBYstep: [],
              diets: [],
              image: '',
              }) 
}

    return (
        <div className='formContainer'>
        <button className='buttonBack' onClick={() => history.push('/home')}>←</button>
        
        <form className='form-Container' onSubmit={onSubmit}>
            <div className='input-label'>
            <label className='label' htmlFor='title'>Title</label>
            <input className={error.includes('datos obligatorios') && 'danger'}
                name="title"
                id = "titleInput"
                type="text"
                value={input.name}
                onChange={(e) => validateTyS(e)}
                placeholder="Title" />
            </div>
            
            <div className='input-label'>
            <label htmlFor='summary'>Summary</label>
             <input className={error.includes('datos obligatorios') && 'danger'}
                name="summary"
                id = "summaryInput"
                type="text"
                value={input.name}
                onChange={(e) => validateTyS(e)}
                placeholder="Summary" />
            </div>
           
             <div className='input-label'>
             <label htmlFor='healthScore'>HealthScore</label>
             <input className={error.includes('health') && 'danger'}
                name="healthScore"
                type="number"
                value={input.name}
                onChange={(e) => validateHS(e)}
                placeholder="HealthScore" />
             </div>
            
            <div className='input-label'>
            <label htmlFor='currentStep'>Step-By-Step</label>  
            <input 
                name="currentStep"
                type="text"
                value={currentStep.description}
                onChange={(e) => handleChange(e)}
                placeholder="Step" /> 

            <input className='buttonNormal' type="button" name="AddStep" value="AddStep" onClick={Adder}/>
            </div>
                
            <div >
                {input.stepBYstep.map((el,i) => (
                  <div key={i+'inputStepKey'}>
                    <label htmlFor={i}>Step {i + 1}</label>
                    <input className='inputNormal'
                          name="stepBYstep"
                          id={`${i}step`}
                          type='text'
                          value={el}
                          onChange={(e) => handleStepsChange(e)} />
                    <button name='step' className='buttonNormal' id={i+'ST'} onClick={(e) => Deleter(e)}> x </button>
                  </div>
                ))}
            </div>
            
            <div className='input-label'>
            <label htmlFor='newDiet'>Diets</label>
            <input className='inputNormal'
                name="newDiet"
                type="text"
                value={newDiet.name}
                onChange={(e) => handleChange(e)}
                placeholder="Diet" /> 
          
            <input className='buttonNormal' type="button" name="AddDiet" value="AddDiet" onClick={Adder}/>
                  
            <select className='inputNormal' name="AddExDiet" onChange={Adder}>
                    <option>--- Select from our Diets</option>
                    {allDiets.map((d,i) => {return (<option key={i+'globalDietKey'} id={`${i}exDiet`} value={d}>{d}</option>)})}
                </select>           
            
            </div>       
            <div>
            {input.diets.map((el,i) => (
                  <div key={i+'inputDietKey'} >
                    <label htmlFor={i}>Diet {i + 1}</label>
                    <input className='inputNormal'
                          name="diets"
                          id={`${i}diet`}
                          type='text'
                          value={el}
                          onChange={(e) => handleDietChange(e)} />
                    <button className='buttonNormal' name='diet' id={i+'DT'} onClick={(e) => Deleter(e)}> x </button>
                  </div>
                ))}
            </div>
            
            <div className='input-label'>
            <label htmlFor='image'>Image</label>  
            <input className={error.includes('URL') && 'danger'}
                name="image"
                type="text"
                value={input.name}
                onChange={(e) => validateImage(e)}
                placeholder="Insert url" />
            </div> 
            <div  >
                <h5>Image Preview</h5>
                <img className='imagePreview' src={input.image ? input.image : 'https://i.pinimg.com/originals/dd/08/4f/dd084ff0b0739c6bf1268d5e815ee7a1.png'} alt='preview'/>
            </div>

            {!error ? null : <div>{error}</div>}
            <input className='buttonSubmit' id="btnSubmit" type="submit" value="Add Recipe" />
        </form>
        </div>

    )
}