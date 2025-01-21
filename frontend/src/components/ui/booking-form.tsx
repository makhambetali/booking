'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { phoneRegex } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { H3 } from './typography';
import { RequiredStar } from './required-star';

const formSchema = z.object({
    name: z.string().min(1, 'Имя является обязательный полем.'),
    phone: z.string().regex(phoneRegex, 'Неверный формат телефона.'),
    comment: z.string().optional(),
});

export default function BookingForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { phone: '+7', name: '', comment: '' },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error('Form submission error', error);
            toast.error('Не удалось отправить форму. Пожалуйста, попробуйте еще раз.');
        }
    }

    return (
        <div className=" mx-auto w-full max-w-3xl px-6 sm:px-20 md:px-24 lg:px-12">
            <H3 className="mb-8">Контактные данные</H3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel>
                                    Телефон <RequiredStar />
                                </FormLabel>
                                <FormControl className="w-full">
                                    <PhoneInput placeholder="Введите номер телефона." {...field} defaultCountry="KZ" />
                                </FormControl>
                                <FormDescription>Введите ваш номер телефона.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Имя <RequiredStar />
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Введите ваше имя." type="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Комментарий</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Добавьте комментарий (по желанию)."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Отправить</Button>
                </form>
            </Form>
        </div>
    );
}
