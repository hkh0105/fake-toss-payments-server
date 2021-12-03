/**
 * @packageDocumentation
 * @module api.functional.payments
 */
//================================================================
import { AesPkcs5 } from "./../../__internal/AesPkcs5";
import { Fetcher } from "./../../__internal/Fetcher";
import { Primitive } from "./../../Primitive";
import type { IConnection } from "./../../IConnection";

import type { ITossPayment } from "./../../structures/ITossPayment";
import type { ITossCardPayment } from "./../../structures/ITossCardPayment";
import type { ITossPaymentCancel } from "./../../structures/ITossPaymentCancel";


/**
 * 결제 정보 조회하기.
 * 
 * `payments.at` 은 결제 정보를 조회하는 함수이다.
 * 
 * 주로 클라이언트 어플리케이션이 토스 페이먼츠가 자체적으로 제공하는 결제 창을 사용하는
 * 경우, 그래서 프론트 어플리케이션이 귀하의 백엔드 서버에 `paymentKey` 등 극히 일부의
 * 식별자 정보만을 전달해주어, 상세 결제 정보가 필요할 때 사용한다.
 * 
 * 참고로 토스 페이먼츠는 다른 결제 PG 사들과 다르게, 클라이언트 어플리케이션에서 토스
 * 페이먼츠의 결제 창을 이용하여 진행한 결제가 바로 확정되는 것은 아니다. 귀사의 백엔드
 * 서버가 현재의 `payments.at` 을 통하여 해당 결제 정보를 확인하고, {@link approve} 를
 * 호출하여 직접 승인하기 전까지, 해당 결제는 확정되지 않으니, 이 점에 유의하기 바란다.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param paymentKey 결제 정보의 {@link ITossPayment.paymentKey}
 * @returns 결제 정보
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller FakeTossPaymentsController.at()
 * @path GET /payments/:paymentKey
 */
export function at
    (
        connection: IConnection,
        paymentKey: string
    ): Promise<at.Output>
{
    return Fetcher.fetch
    (
        connection,
        at.CONFIG,
        at.METHOD,
        at.path(paymentKey)
    );
}
export namespace at
{
    export type Output = Primitive<ITossPayment>;


    export const METHOD = "GET";
    export const PATH = "/payments/:paymentKey";
    export const CONFIG = {
        input_encrypted: false,
        output_encrypted: false,
    };

    export function path(paymentKey: string): string
    {
        return `/payments/${paymentKey}`;
    }
}

/**
 * 결제 승인하기.
 * 
 * 토스 페이먼츠는 귀사의 백엔드에서 일어난 결제가 아닌 프론트 어플리케이션의 결제 창에서 
 * 이루어진 결제의 경우, 해당 서비스으 백엔드 서버로부터 결제를 승인받기 전까지, 이를 
 * 확정하지 않는다. `payments.approve` 는 바로 이러한 상황에서, 해당 결제를 승인해주는 
 * 함수이다.
 * 
 * 만일 귀하가 `fake-toss-payments-server` 를 이용하여 결제를 시뮬레이션하는 경우라면,
 * 결제 관련 API 를 호출함에 있어 {@link ITossCardPayment.IStore.__approved} 내지
 * {@link  ITossVirtualAccountPayment.IStore.__approved } 를 `false` 로 함으로써, 별도 
 * 승인이 필요한 이러한 상황을 시뮬레이션 할 수 있다.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param paymentKey 대상 결제의 {@link ITossPayment.paymentKey}
 * @param input 주문 정보 확인
 * @returns 승인된 결제 정보
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller FakeTossPaymentsController.approve()
 * @path POST /payments/:paymentKey
 */
export function approve
    (
        connection: IConnection,
        paymentKey: string,
        input: Primitive<approve.Input>
    ): Promise<approve.Output>
{
    return Fetcher.fetch
    (
        connection,
        approve.CONFIG,
        approve.METHOD,
        approve.path(paymentKey),
        input
    );
}
export namespace approve
{
    export type Input = Primitive<ITossPayment.IApproval>;
    export type Output = Primitive<ITossPayment>;


    export const METHOD = "POST";
    export const PATH = "/payments/:paymentKey";
    export const CONFIG = {
        input_encrypted: false,
        output_encrypted: false,
    };

    export function path(paymentKey: string): string
    {
        return `/payments/${paymentKey}`;
    }
}

/**
 * 카드로 결제하기.
 * 
 * `payments.key_in` 은 카드를 이용한 결제를 할 때 호출되는 API 함수이다.
 * 
 * 참고로 `payments.key_in` 는 클라이언트 어플리케이션이 토스 페이먼츠가 자체적으로 
 * 제공하는 결제 창을 사용하는 경우, 귀하의 백엔드 서버가 이를 실 서비스에서 호출하는 
 * 일은 없을 것이다. 다만, 고객이 카드를 통하여 결제하는 상황을 시뮬레이션하기 위하여, 
 * 테스트 자동화 프로그램 수준에서 사용될 수는 있다.
 * 
 * 그리고 귀하의 백엔드 서버가 `payments.key-in` 을 직접 호출하는 경우, 토스 페이먼츠
 * 서버는 이를 완전히 승인된 결제로 보고 바로 확정한다. 때문에 `payments.key-in` 을
 * 직접 호출하는 경우, 토스 페이먼츠의 결제 창을 이용하여 별도의 {@link approve} 가
 * 필요한 때 대비, 훨씬 더 세심한 주의가 요구된다.
 * 
 * 더하여 만약 귀하의 백엔드 서버가 `fake-toss-payments-server` 를 이용하여 고객의 
 * 카드 결제를 시뮬레이션하는 경우, {@link ITossCardPayment.IStore.__approved} 값을 
 * `false` 로 하여 카드 결제의 확정을 고의로 회피할 수 있다. 이를 통하여 토스 
 * 페이먼츠의 결제 창을 이용한 카드 결제의 경우, 별도의 {@link approve} 가 필요한 
 * 상황을 시뮬레이션 할 수 있다.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param input 카드 결제 입력 정보
 * @returns 카드 결제 정보
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller FakeTossPaymentsController.key_in()
 * @path POST /payments/key-in
 */
export function key_in
    (
        connection: IConnection,
        input: Primitive<key_in.Input>
    ): Promise<key_in.Output>
{
    return Fetcher.fetch
    (
        connection,
        key_in.CONFIG,
        key_in.METHOD,
        key_in.path(),
        input
    );
}
export namespace key_in
{
    export type Input = Primitive<ITossCardPayment.IStore>;
    export type Output = Primitive<ITossCardPayment>;


    export const METHOD = "POST";
    export const PATH = "/payments/key-in";
    export const CONFIG = {
        input_encrypted: false,
        output_encrypted: false,
    };

    export function path(): string
    {
        return `/payments/key-in`;
    }
}

/**
 * 결제 취소하기.
 * 
 * `payments.cancel` 은 결제를 취소하는 API 이다.
 * 
 * 결제 취소 입력 정보 {@link ITossPaymentCancel.IStore} 에는 취소 사유를 비롯하여,
 * 고객에게 환불해 줄 금액과 부가세 및 필요시 환불 계좌 정보 등을 입력하게 되어있다.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param paymentKey 결제 정보의 {@link ITossPayment.paymentKey}
 * @param input 취소 입력 정보
 * @returns 취소된 결제 정보
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller FakeTossPaymentsController.cancel()
 * @path POST /payments/:paymentKey/cancel
 */
export function cancel
    (
        connection: IConnection,
        paymentKey: string,
        input: Primitive<cancel.Input>
    ): Promise<cancel.Output>
{
    return Fetcher.fetch
    (
        connection,
        cancel.CONFIG,
        cancel.METHOD,
        cancel.path(paymentKey),
        input
    );
}
export namespace cancel
{
    export type Input = Primitive<ITossPaymentCancel.IStore>;
    export type Output = Primitive<ITossPayment>;


    export const METHOD = "POST";
    export const PATH = "/payments/:paymentKey/cancel";
    export const CONFIG = {
        input_encrypted: false,
        output_encrypted: false,
    };

    export function path(paymentKey: string): string
    {
        return `/payments/${paymentKey}/cancel`;
    }
}



//---------------------------------------------------------
// TO PREVENT THE UNUSED VARIABLE ERROR
//---------------------------------------------------------
AesPkcs5;
Fetcher;
Primitive;
