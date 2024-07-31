import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Row,
} from 'antd';
import { FormInstance } from 'antd/es/form';
import moment from 'moment';
import 'moment/locale/ru';

const { TextArea } = Input;
const { Option } = Select;

interface FormValues {
  fullName: string;
  birthDate: moment.Moment | null;
  experience: number | null;
  position: string;
  username: string;
  password?: string;
  email: string;
  phoneNumber?: string;
  notes?: string;
}

const AdForm: React.FC = () => {
  const [form] = Form.useForm<FormInstance<FormValues>>();
  const [editing, setEditing] = useState(false);

  const initialValues: FormValues = {
    fullName: 'Иван Иванов',
    birthDate: moment('1990-01-01'),
    experience: 10,
    position: 'Менеджер по работе с клиентами',
    username: 'ivanov',
    password: '',
    email: 'ivanov@example.com',
    phoneNumber: '1234567890',
    notes: 'Это примечание.',
  };

  const toggleEdit = () => {
    if (editing) {
      form.resetFields();
    }
    setEditing(!editing);
  };

  const onSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Saved values:', values);
        setEditing(false);
        message.success('Данные сохранены!');
      })
      .catch((errorInfo) => {
        console.log('Ошибка сохранения:', errorInfo);
      });
  };

  const onCancel = () => {
    form.setFieldsValue({});
    setEditing(false);
  };

  return (
    <>
      <Form
        form={form}
        initialValues={initialValues}
        layout='vertical'
        disabled={!editing}
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          label='ФИО'
          name='fullName'
          rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label='Дата рождения'
            name='birthDate'
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите дату рождения',
              },
              {
                validator: (_, value) =>
                  value && value.isBefore(moment().subtract(130, 'years'))
                    ? Promise.reject('Некорректная дата рождения')
                    : Promise.resolve(),
              },
            ]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <DatePicker format='DD.MM.YYYY' />
          </Form.Item>
          <Form.Item
            label='Стаж (лет)'
            name='experience'
            rules={[
              {
                type: 'number',
                max: 100,
                message: 'Стаж не может быть больше 100 лет',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const birthDate = getFieldValue('birthDate');
                  if (birthDate && value !== undefined) {
                    const age = moment().diff(birthDate, 'years');
                    if (value > age) {
                      return Promise.reject(
                        new Error('Стаж не может быть больше возраста')
                      );
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label='Должность'
          name='position'
          rules={[
            { required: true, message: 'Пожалуйста, выберите должность' },
          ]}
        >
          <Select>
            <Option value='Директор'>Директор</Option>
            <Option value='Менеджер по работе с клиентами'>
              Менеджер по работе с клиентами
            </Option>
            <Option value='Специалист тех. поддержки'>
              Специалист тех. поддержки
            </Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label='Логин'
            name='username'
            rules={[
              { required: true, message: 'Пожалуйста, введите логин' },
              { min: 3, message: 'Логин должен содержать минимум 3 символа' },
              {
                max: 20,
                message: 'Логин должен содержать максимум 20 символов',
              },
            ]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Пароль'
            name='password'
            rules={[
              { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
              {
                max: 12,
                message: 'Пароль должен содержать максимум 12 символов',
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input.Password />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Некорректный формат email' },
            ]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Номер телефона'
            name='phoneNumber'
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label='Примечание'
          name='notes'
          rules={[
            {
              max: 400,
              message: 'Примечание не может содержать больше 400 символов',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
      {!editing ? (
        <Button type='primary' onClick={toggleEdit}>
          Изменить
        </Button>
      ) : (
        <>
          <Button type='primary' onClick={onSave}>
            Сохранить
          </Button>

          <Button onClick={onCancel}>Отмена</Button>
        </>
      )}
    </>
  );
};

export default AdForm;