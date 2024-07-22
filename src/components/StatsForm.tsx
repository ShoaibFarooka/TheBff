import { SubmitHandler, useForm } from 'react-hook-form';
// get weight, body fat, body measurements, and steps
// get default values in the props and pass them to the form if they exist
// style using tailwindcss

interface StatsFormProps {
    weight?: number | string
    bodyFat?: number | string
    bodyMeasurements?: number[] | string
    steps?: number | string
}

type Inputs = {
    weight: number
    bodyFat: number
    bodyMeasurements: string;
    steps: number
}

const StatsForm: React.FC<StatsFormProps> = ({
    weight,
    bodyFat,
    bodyMeasurements,
    steps
}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="weight">Weight</label>
            <input
                type="number"
                id="weight"
                {...register("weight", { required: true })}
            />
            {errors.weight && <span>
                {errors.weight.message ?? 'This field is required'}
            </span>}

            <label htmlFor="bodyFat">Body Fat</label>
            <input
                type="number"
                id="bodyFat"
                {...register("bodyFat", { required: true })}
            />
            {errors.bodyFat && <span>
                {errors.bodyFat.message ?? 'This field is required'}
            </span>}

            <label htmlFor="bodyMeasurements">Body Measurements</label>
            <input
                type="text"
                id="bodyMeasurements"
                {...register("bodyMeasurements", { required: true })}
            />
            {errors.bodyMeasurements && <span>
                {errors.bodyMeasurements.message ?? 'This field is required'}
            </span>
            }

            <label htmlFor="steps">Steps</label>
            <input
                type="number"
                id="steps"
                {...register("steps", { required: true })}
            />
            {errors.steps && <span>
                {errors.steps.message ?? 'This field is required'}
            </span>}

            <input type="submit" />
        </form>
    )
}

export default StatsForm