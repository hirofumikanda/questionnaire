import { Container, Input, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { app, database } from "../config/firebase";
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {

  const { watch, control, register, handleSubmit, formState: { errors } } = useForm();
  const watchAllVal = watch();
  const collectionRef = collection(database, "answers");

  const q3Options = [
    { id: "q3Yes", label: "はい", value: "true" },
    { id: "q3No", label: "いいえ", value: "false" },
    { id: "q3Unknown", label: "わからない", value: "unknown" }
  ];

  const q4Options = [
    { id: "q4Yesp", label: "はい", value: "true" },
    { id: "q4No", label: "いいえ", value: "false" },
    { id: "q4Unknown", label: "わからない", value: "unknown" }
  ];

  const q5Options = [
    { id: "python", label: "Python", value: "python" },
    { id: "javascript", label: "JavaScript", value: "javascript" },
    { id: "java", label: "Java", value: "java" }
  ];

  const onSubmit = (data) => {
    // e.preventDefault();
    // console.log("submitted!");
    // const { name, birthday, isProgramming, haveProgrammed } = data;
    console.log(`名前:${data.name}, 
      誕生日:${data.birthday}, 
      プログラミング経験:${data.isProgramming} ${data.haveProgrammed}
      プログラミング言語:${data.whichLanguages}`);
    addDoc(collectionRef, {
      name: data.name,
      birthday: data.birthday,
      isProgramming: data.isProgramming,
      haveProgrammed: data.haveProgrammed,
      whichLanguages: data.whichLanguages
    })
      .then((response) => {
        console.log("データ登録完了");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Container maxWidth="md">
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            {/* <input type="text" id="name" {...register("name")} /> */}
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) =>
                <Input
                  type="text"
                  value={value}
                  onChange={onChange}
                />
              }
            />
          </div>
          <div>
            <label htmlFor="birthday">Q2. 誕生日を入力してください（例：19900101）。</label>
            {/* <input type="text" id="birthday" {...register("birthday", { required: true, pattern: /^[0-9]{8}$/ })} />
            {errors.birthday && errors.birthday.type === "required" && <div style={{ color: "red" }}>このフィールドは回答必須です。</div>}
            {errors.birthday && errors.birthday.type === "pattern" && <div style={{ color: "red" }}>8桁の数字で入力してください</div>} */}
            <Controller
              name="birthday"
              defaultValue=""
              control={control}
              rules={{ required: "このフィールドは回答必須です。", pattern: { value: /^[0-9]{8}$/, message: "8桁の数字で入力してください" } }}
              render={({ field: { value, onChange }, fieldState }) =>
                <TextField
                  type="text"
                  value={value}
                  onChange={onChange}
                  error={fieldState.invalid}
                  helperText={fieldState.error && fieldState.error.message}
                />
              }
            />
          </div>
          <div>
            <legend>Q3．現在、プログラミングを学習していますか。</legend>
            {q3Options.map((radio) => {
              const { id, label, value } = radio;
              return (
                <label key={id}>
                  <input type="radio" value={value} name="isProgramming" {...register("isProgramming", { required: true })} />
                  {label}
                </label>
              );
            })}
            {errors.isProgramming && <div style={{ color: "red" }}>このフィールドは回答必須です。</div>}
          </div>
          <div>
            <legend>Q4．これまでに、プログラミングを学習したことがありますか。</legend>
            {q4Options.map((radio) => {
              const { id, label, value } = radio;
              return (
                <label key={id}>
                  <input type="radio" value={value} name="haveProgrammed" {...register("haveProgrammed", { required: true })} />
                  {label}
                </label>
              );
            })}
            {errors.haveProgrammed && <div style={{ color: "red" }}>このフィールドは回答必須です。</div>}
          </div>
          {(watchAllVal.isProgramming === "true" || watchAllVal.haveProgrammed === "true") &&
            <div>
              <legend>Q5．今まで学習したことのあるプログラミング言語をすべて教えてください。</legend>
              {q5Options.map((checkbox) => {
                const { id, label, value } = checkbox;
                return (
                  <label key={id}>
                    <input type="checkbox" value={value} name="whichLanguages" {...register("whichLanguages")} />
                    {label}
                  </label>
                );
              })}
            </div>}
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
};
