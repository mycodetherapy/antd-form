import React, { useState } from 'react';
import './styles.css';
import dayjs from 'dayjs';
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
import {
  birthDateRule,
  emailRule,
  experienceRule,
  maxLengthRule,
  minLengthRule,
  phoneNumberRule,
  requiredRule,
} from '../validationRules';
import { FormValues } from '../types';
import { INIT_VALUES, POSITIONS } from '../constants';
import { mapServerDataToFormValues } from '../utils';

const { TextArea } = Input;
const { Option } = Select;

const AdForm: React.FC = () => {
  const [form] = Form.useForm<FormInstance<FormValues>>();
  const [editing, setEditing] = useState<boolean>(false);
  const [lastSavedValues, setLastSavedValues] = useState(
    mapServerDataToFormValues(INIT_VALUES)
  );

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
        const transformedValues = {
          ...values,
          fullName: values.fullName.trim(),
          birthDate: values.birthDate.toDate(),
          phoneNumber: values.phoneNumber.trim(),
          notes: values.notes ? values.notes.trim() : undefined,
        };
        setLastSavedValues(transformedValues);
        setEditing(false);
        message.success('Данные сохранены!');
      })
      .catch((error) => {
        console.log('Ошибка сохранения:', error);
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
        initialValues={{
          ...lastSavedValues,
          birthDate: dayjs(lastSavedValues.birthDate),
        }}
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
            dependencies={['experience']}
            className='form-field'
          >
            <DatePicker
              format='DD.MM.YYYY'
              disabledDate={(current) => {
                return current && current > dayjs().endOf('day');
              }}
            />
          </Form.Item>
          <Form.Item
            label='Стаж (лет)'
            name='experience'
            rules={[experienceRule(form.getFieldValue)]}
            dependencies={['birthDate']}
            className='form-field'
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Form.Item label='Должность' name='position'>
            <Select>
              {POSITIONS.map((position) => (
                <Option key={position} value={position}>
                  {position}
                </Option>
              ))}
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
            normalize={(value: string) => value.trim()}
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
            normalize={(value: string) => value.trim()}
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
            normalize={(value: string) => value.trim()}
            className='form-field'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Номер телефона'
            name='phoneNumber'
            rules={[phoneNumberRule()]}
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
