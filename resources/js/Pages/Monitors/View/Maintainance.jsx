import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import TableData from '@/Components/TableData';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/inertia-react';

export default function(props) {
    const [showModal, setShowModal] = React.useState(false);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        description: '',
        startAt: '',
        endAt: '',
    });

    const planMaintainance = (e) => {
        e.preventDefault();

        post(route('monitors.maintainance.create', props.monitor.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Planned Maintainance!')
                closeModal()
            },
            onError: () => {
                toast.error('Something went wrong!')
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    return (
        <>
            <div className='flex justify-between mb-2'>
                <h2 className='text-2xl my-auto'>Maintainance</h2>

                <PrimaryButton className='my-auto' onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faPlus} className='mr-2'/>
                    Plan Maintainance
                </PrimaryButton>
            </div>

            <Table headers={['Title', 'Starts At', 'Ends At', 'Created At']} >
                {props.maintainances.map((maintainance, index) => (
                    <tr class="hover:bg-gray-50" key={index}>
                        <TableData className="font-bold">{maintainance.title}</TableData>
                        <TableData>{new Date(maintainance.start_at).toLocaleString()}</TableData>
                        <TableData>{new Date(maintainance.end_at).toLocaleString()}</TableData>
                        <TableData>{new Date(maintainance.created_at).toLocaleString()}</TableData>
                    </tr>
                ))}
            </Table>

            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={planMaintainance} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Schedule Maintainance
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Plan a maintainance for your monitor. This will prevent any alerts from being sent during the maintainance period. 
                    </p>

                    <div className="mt-2">
                        <InputLabel for="title" value="Title"/>

                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            handleChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Maintainance Title"
                        />

                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    
                    <div className="mt-2">
                        <InputLabel for="description" value="Description"/>

                        <TextInput
                            id="description"
                            as='textarea'
                            type="text"
                            name="description"
                            value={data.description}
                            handleChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Maintainance Description"
                        />

                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="mt-2">
                            <InputLabel for="startAt" value="Starts At"/>

                            <TextInput
                                id="startAt"
                                type="datetime-local"
                                name="startAt"
                                value={data.startAt}
                                handleChange={(e) => setData('startAt', e.target.value)}
                                className="mt-1 block w-full"
                            />

                            <InputError message={errors.startAt} className="mt-2" />
                        </div>
                        
                        <div className="mt-2">
                            <InputLabel for="endAt" value="Ends At"/>

                            <TextInput
                                id="endAt"
                                type="datetime-local"
                                name="endAt"
                                value={data.endAt}
                                handleChange={(e) => setData('endAt', e.target.value)}
                                className="mt-1 block w-full"
                            />

                            <InputError message={errors.endAt} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3" processing={processing}>
                            Plan Maintaince
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
