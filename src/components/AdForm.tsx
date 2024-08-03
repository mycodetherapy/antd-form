import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
  Row,
  Card,
} from 'antd';
import { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';
import {
  birthDateRule,
  emailRule,
  experienceRule,
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from '../validationRules';

const { TextArea } = Input;
const { Option } = Select;

interface FormValues {
  fullName: string;
  birthDate: dayjs.Dayjs;
  experience?: number | null;
  position: string;
  username: string;
  password?: string;
  email: string;
  phoneNumber: string;
  notes?: string;
}

const AdForm: React.FC = () => {
  const [form] = Form.useForm<FormInstance<FormValues>>();
  const [editing, setEditing] = useState<boolean>(false);
  const [lastSavedValues, setLastSavedValues] = useState({
    fullName: 'Иванов Иван Иванович',
    birthDate: dayjs('1990-01-01'),
    experience: 10,
    position: 'Менеджер по работе с клиентами',
    username: 'ivanov',
    password: '',
    email: 'ivanov@example.com',
    phoneNumber: '+7 777 777 77 77',
    notes: 'Это примечание.',
  });

  const toggleEdit = () => {
    if (editing) {
      form.resetFields();
    }
    setEditing(!editing);
  };

  const onSave = () => {
    form
      .validateFields()
      .then((values: any) => {
        setLastSavedValues(values);
        setEditing(false);
        message.success('Данные сохранены!');
      })
      .catch((errorInfo) => {
        console.log('Ошибка сохранения:', errorInfo);
      });
  };

  const onCancel = () => {
    form.resetFields();
    setEditing(false);
  };

  return (
    <Card className='form-wrap'>
      <Form
        form={form}
        initialValues={lastSavedValues}
        layout='vertical'
        disabled={!editing}
        requiredMark={false}
        className='form'
      >
        <Form.Item>
          <Form.Item
            label='ФИО'
            name='fullName'
            rules={[requiredRule('Пожалуйста, введите ФИО')]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item className='form-row'>
          <Form.Item
            label='Дата рождения'
            name='birthDate'
            rules={[birthDateRule]}
            className='form-field'
          >
            <DatePicker
              format='DD.MM.YYYY'
              onChange={() => form.validateFields(['experience'])}
            />
          </Form.Item>
          <Form.Item
            label='Стаж (лет)'
            name='experience'
            rules={[experienceRule(form.getFieldValue)]}
            className='form-field'
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Form.Item label='Должность' name='position'>
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
        </Form.Item>

        <Form.Item className='form-row'>
          <Form.Item
            label='Логин'
            name='username'
            rules={[
              requiredRule('Пожалуйста, введите логин'),
              minLengthRule(3, 'Логин должен содержать минимум 3 символа'),
              maxLengthRule(20, 'Логин должен содержать максимум 20 символов'),
            ]}
            className='form-field'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Пароль'
            name='password'
            rules={[
              minLengthRule(6, 'Пароль должен содержать минимум 6 символов'),
              maxLengthRule(12, 'Пароль должен содержать максимум 12 символов'),
            ]}
            className='form-field'
          >
            <Input.Password />
          </Form.Item>
        </Form.Item>

        <Form.Item className='form-row'>
          <Form.Item
            label='Email'
            name='email'
            rules={[requiredRule('Пожалуйста, введите email'), emailRule]}
            className='form-field'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Номер телефона'
            name='phoneNumber'
            className='form-field'
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label='Примечание'
          name='notes'
          rules={[
            maxLengthRule(
              400,
              'Примечание не может содержать больше 400 символов'
            ),
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
      <Row className='button-wrap'>
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
      </Row>
    </Card>
  );
};

export default AdForm;
